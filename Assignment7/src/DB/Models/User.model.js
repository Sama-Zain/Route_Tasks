import { DataTypes } from 'sequelize';
import { sequelize } from '../connection.js';
export const User = sequelize.define(
    'Users', {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            }   
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false, 
            validate: {
                checkLength(value) {
                    if (value.length < 6) {
                        throw new Error('Password must be at least 6 characters long');
                    }   
                }
            }       
        },
        role:{
            type: DataTypes.ENUM('admin', 'user'),
            allowNull: false, 
            defaultValue: 'user',  
        },
}, {
  timestamps: true, // createdAt and updatedAt
  paranoid: true, // soft delete
  freezeTableName: true, // disable plural table name
  hooks:{
    beforeCreate(user){
        if(user.name.length < 2){
            throw new Error('Name must be at least 2 characters long');
        }
  }
}
});


