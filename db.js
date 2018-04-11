const Sequelize = require('sequelize');

const db = new Sequelize(
    'socializedb',
    'soc',
    'socpass',

    {
        dialect: 'mysql',
        host: 'localhost',
        // pool:{
        //     max:8,
        //     min:0,
        //     aquire:30000,
        //     idle:10000
        // },
        operatorsAliases: false,
    }
);

const Users = sequelize.define('users', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
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