import { Sequelize, Model, DataTypes } from "sequelize";
const config = require("./db.config");

const sequelize = new Sequelize(config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    //operatorsAliases: false,

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    },
    define: {
      timestamps: config.define.timestamps
    }
  }
);

const db = { Sequelize, sequelize, Model, DataTypes,};
sequelize.authenticate();
export default db;
