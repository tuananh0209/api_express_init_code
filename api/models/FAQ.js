const Sequelize = require('sequelize')
const sequelize = require('../dbConfig').sequelize
const Model = Sequelize.Model

const uuidv4 = require('uuid').v4

class FAQ extends Model{}

FAQ.init({
    question:{
        type: Sequelize.TEXT,
        allowNull: true
    },
    answer:{
        type: Sequelize.TEXT,
        allowNull: true
    },
    id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull:false,
        defaultValue:uuidv4()
    }
},
    {
        sequelize,
    }
)

module.exports = FAQ