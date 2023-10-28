import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
    dialect: 'sqlite',
    host: './db.sqlite3',
    logging: false
});

export default sequelize