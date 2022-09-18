
const Sequelize = require('sequelize');

const databaseConnection = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_Dialect,
    operatorsAliases: false,
    pool: { max: 5, min: 0, idle: 10000 }
})


databaseConnection.authenticate().then(() => {
    console.log('Success Fully Connected To Database');
}).catch((err) => {
    console.log('Some Thing Went wrong in database', err);
});


module.exports = databaseConnection;