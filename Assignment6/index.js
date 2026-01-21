const mysql = require('mysql2');
const express = require('express');
const app = express();
app.use(express.json());
const port = 3000;
const connections = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'retail_store'
});
connections.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    };
    console.log("Connected to the database!");
});
// http://localhost:3000/add-category
app.post('/add-category', (req, res) => {
    const checkSql = "SHOW COLUMNS FROM products LIKE 'category'";

    connections.query(checkSql, (err, result) => {
        if (err) return res.status(500).send('Error checking column');

        if (result.length > 0) return res.send('Category column already exists');

        const alterSql = 'ALTER TABLE products ADD COLUMN category TEXT';

        connections.query(alterSql, (err2, result2) => {
            if (err2) return res.status(500).send('Error adding category column');

            res.send(`Category column added successfully`);
        });
    });
});

// http://localhost:3000/remove-category
app.delete('/remove-category', (req, res) => {
    const sql = 'ALTER TABLE products DROP COLUMN category';
    connections.query(sql, (err, result) => {
        if (err) {
            console.error('Error removing category column:', err);
            res.status(500).send('Error removing category column');
            return;
        }
        if (result.warningCount === 0) {
            console.log('Category column removed successfully');
        }
        res.send('Category column removed successfully');
    });
});
// http://localhost:3000/modify-contact
app.patch('/modify-contact', (req, res) => {
    const sql = 'ALTER TABLE suppliers MODIFY COLUMN contact_number VARCHAR(15)';
    connections.query(sql, (err, result) => {
        if (err) {
            console.error('Error modifying contact_number column:', err);
            res.status(500).send('Error modifying contact_number column');
            return;
        }
        if (result.warningCount === 0) {
            console.log('contact_number column modified successfully');
        }
        res.send('contact_number column modified successfully');
    });
});
// http://localhost:3000/product-name
app.patch('/product-name', (req, res) => {
    const sql = 'ALTER TABLE products MODIFY COLUMN product_name TEXT NOT NULL';
    connections.query(sql, (err, result) => {
        if (err) {
            console.error('Error modifying product_name column:', err);
            res.status(500).send('Error modifying product_name column');
            return;
        }
        if (result.warningCount === 0) {
            console.log('product_name column modified successfully');
        }
        res.send('product_name column modified successfully');
    });
});
// http://localhost:3000/insrt-supplier
app.post('/insrt-supplier', (req, res) => {
    const { supplier_name, contact_number } = req.body;
    const sql = 'INSERT INTO suppliers (supplier_name, contact_number) VALUES (?, ?)';
    connections.query(sql, [supplier_name, contact_number], (err, result) => {
        if (err) {
            console.error('Error inserting supplier:', err);
            return res.status(500).send('Error inserting supplier');
        }
        res.status(201).json({
            message: 'Supplier inserted successfully',
            result: result
        });
    });
});
// http://localhost:3000/insrt-products
app.post('/insrt-products', (req, res) => {
    const { product_name, price, stock_quantity, supplier_id } = req.body;

    const sql = 'INSERT INTO products (product_name, price, stock_quantity, supplier_id) VALUES (?, ?, ?, ?)';

    connections.query(sql, [product_name, price, stock_quantity, supplier_id], (err, result) => {
        if (err) {
            console.error('Error inserting product:', err);
            return res.status(500).send('Error inserting product');
        }
        res.status(201).json({
            message: 'Product inserted successfully',
            result: result
        });
    });
});
// http://localhost:3000/insert-sales
app.post('/insert-sales', (req, res) => {
    const { product_id, quantity_sold, sale_date } = req.body;

    const sql = 'INSERT INTO sales (product_id, quantity_sold, sale_date) VALUES (?, ?, ?)';

    connections.query(sql, [product_id, quantity_sold, sale_date], (err, result) => {
        if (err) {
            console.error('Error inserting sale:', err);
            return res.status(500).send('Error inserting sale');
        }
        res.status(201).json({
            message: 'Sale inserted successfully',
            result: result
        });
    });
});
// http://localhost:3000/update-price
app.patch('/update-price', (req, res) => {
    const { product_name, new_price } = req.body; 
    const sql = 'UPDATE products SET price = ? WHERE product_name = ?';
    connections.query(sql, [new_price, product_name], (err, result) => {
        if (err) {
            console.error('Error updating product price:', err);
            return res.status(500).send('Error updating product price');
        }
        res.json({
            message: 'Product price updated successfully',
            result: result
        });
    });
});
// http://localhost:3000/delete-product
app.delete('/delete-product', (req, res) => {
    const { product_name } = req.body; 
    const sql = 'DELETE FROM products WHERE product_name = ?';  
    connections.query(sql, [product_name], (err, result) => {
        if (err) {
            console.error('Error deleting product:', err);
            return res.status(500).send('Error deleting product');
        }
        res.json({
            message: 'Product deleted successfully',
            result: result
        });
    });
});
// http://localhost:3000/total-sold
app.get('/total-sold', (req, res) => {
    const sql = `
        SELECT p.product_name, SUM(s.quantity_sold) AS total_quantity_sold
        FROM products p
        JOIN sales s ON p.product_id = s.product_id 
        GROUP BY p.product_id, p.product_name
    `;
    connections.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching total sold quantities:', err);
            return res.status(500).send('Error fetching total sold quantities');
        }
        res.status(200).json({
            message: 'Total sold quantities fetched successfully',
            data: results
        });
    });
}); 
// http://localhost:3000/high-stock
app.get('/high-stock', (req, res) => {
    const sql = `
        SELECT *   
        FROM products
        ORDER BY stock_quantity DESC
        LIMIT 1
    `;
    connections.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching product with highest stock quantity:', err);
            return res.status(500).send('Error fetching product with highest stock quantity');
        }
        res.status(200).json({
            message: 'Product with highest stock quantity fetched successfully',
            data: results
        });
    });
});
// http://localhost:3000/supplier
app.get('/supplier', (req, res) => {
    const sql = `SELECT * FROM suppliers WHERE supplier_name LIKE 'F%'`;
    connections.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching suppliers:', err);
            return res.status(500).send('Error fetching suppliers');
        }   
        res.status(200).json({
            message: 'Suppliers fetched successfully',
            data: results
        });
    });
});
// http://localhost:3000/never-sold
app.get('/never-sold', (req, res) => {
    const sql = `
        SELECT p.*
        FROM products p 
        LEFT JOIN sales s ON p.product_id = s.product_id
        WHERE s.product_id IS NULL
    `;  
    connections.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching never sold products:', err);
            return res.status(500).send('Error fetching never sold products');
        }
        res.status(200).json({
            message: 'Never sold products fetched successfully',
            data: results
        });
    });
});
// http://localhost:3000/all-sales
app.get('/all-sales', (req, res) => {
    const sql = `
        SELECT s.sale_id, p.product_name, s.quantity_sold, s.sale_date      
        FROM sales s
        JOIN products p ON s.product_id = p.product_id
    `;
    connections.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching all sales with product names:', err);
            return res.status(500).send('Error fetching all sales with product names');
        }
        res.status(200).json({
            message: 'All sales with product names fetched successfully',
            data: results
        });
    });
});
// http://localhost:3000/create-user
app.post('/create-user', (req, res) => {
    const { username, password } = req.body;
    const sql='CREATE USER IF NOT EXISTS ?@\'localhost\' IDENTIFIED BY ?';
    connections.query(sql, [username, password], (err, result) => {
        if (err) {
            console.error('Error creating user:', err);
            return res.status(500).send('Error creating user');
        }   
        const sql2='GRANT SELECT, INSERT, UPDATE ON retail_store.* TO ?@\'localhost\'';
        connections.query(sql2, [username], (err2, result2) => {
            if (err2) { 
                console.error('Error granting privileges to user:', err2);
                return res.status(500).send('Error granting privileges to user');
            }
        res.status(201).json({
            message: 'User created successfully with privileges',
            result: result
        });

    });
});
});
// http://localhost:3000/revoke-updates
app.post('/revoke-updates', (req, res) => {
    const { username } = req.body;
    const sql = 'REVOKE UPDATE ON retail_store.* FROM ?@\'localhost\''; 
    connections.query(sql, [username], (err, result) => {
        if (err) {  
            console.error('Error revoking update privileges:', err);
            return res.status(500).send('Error revoking update privileges');
        }
        res.status(200).json({
            message: 'Update privileges revoked successfully',
            result: result
        });
    });
});
// http://localhost:3000/grant-deletes
app.post('/grant-deletes', (req, res) => {
    const { username } = req.body;
    const sql = 'GRANT DELETE ON retail_store.sales TO ?@\'localhost\'';
    connections.query(sql, [username], (err, result) => {
        if (err) {
            console.error('Error granting delete privileges:', err);
            return res.status(500).send('Error granting delete privileges');
        }
        res.status(200).json({
            message: 'Delete privileges granted successfully',
            result: result
        });
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
