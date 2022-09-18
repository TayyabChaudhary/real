const { DataTypes } = require('sequelize');

// --------- Database Connection -----------
const database = require('../connection/database_connection');

// ----------- Create Admin Schema ----------
const Admin = database.define('admincrud', {
    name: {
        type: DataTypes.STRING,
        defaultValue: ''
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        defaultValue: ""
    },
    phone: {
        type: DataTypes.STRING,
        unique: true,
        defaultValue: ''
    }
});

Admin.sync({force: true})


module.exports = Admin;