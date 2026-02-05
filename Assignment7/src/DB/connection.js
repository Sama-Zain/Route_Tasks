import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize(
  'blog_app', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306,
  }
);

export const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

export const syncTables = async () => {
  try {
    await sequelize.sync(); 
    console.log('Tables have been synced successfully.');
  } catch (error) {
    console.error('Unable to sync tables:', error);
  }
};
