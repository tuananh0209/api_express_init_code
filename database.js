import { Sequelize } from 'sequelize';
import { DB_HOST } from './utils/constant.js'

const sequelize = new Sequelize({
    dialect: 'sqlite',
    host: DB_HOST,
    logging: false
});

export default sequelize