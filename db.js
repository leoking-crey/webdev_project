const Sequelize = require('sequelize');

const db = new Sequelize(
    'heroku_ce41ad3bbb3eb81',
    'b423659192897a',
    'b279c93b',
    {
        dialect: 'mysql',
        host: 'us-cdbr-iron-east-05.cleardb.net',
        pool:{
            max:8,
            min:0,
            aquire:30000,
            idle:10000
        },
    }
);

const Users = db.define('users', {
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        defaultValue: "abhinav@gmail.com"
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    }
    
})

db.sync().then(() => console.log("Database is ready"))

exports = module.exports = {
    db,
    Users
}