import { DataTypes } from 'sequelize';
import { database } from '../../database/database.js';

const User = database.define('user', {
  users_id: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true,
    }
  },
  
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  role: {
    type: DataTypes.STRING,
  },
}, {
  timestamps: false,
});

export { User };