import {Sequelize} from "sequelize";
import {dbHost, dbName, dbPass, dbUser} from "../../config/index.js";

export const sequelize = new Sequelize(
    {
        database: dbName,
        username: dbUser,
        password: dbPass,
        host: dbHost,
        dialect: "mysql"
    }
)
