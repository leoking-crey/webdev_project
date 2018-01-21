const Sequelize = require('sequelize');

const db = new Sequelize(
    'userdb',
    'userdb',
    'userdb',
    {
        dialect: 'mysql',
        host: 'localhost'
    }
)

const Users = db.define('users', {
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: true
    }
    
})

db.sync().then(() => console.log("Database is ready"))

exports = module.exports = {
    db,
    Users
}