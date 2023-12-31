import {Sequelize} from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const dbName = process.env.DB_NAME as string;
const dbUser = process.env.DB_USER as string;
const dbPassword = process.env.DB_PASSWORD;
const dbHost = process.env.DB_HOST;
const dbPort = process.env.DB_PORT as number | undefined;

const sequelizeConnection = new Sequelize(
    dbName, dbUser, dbPassword, {
        dialect: 'postgres',
        host: dbHost,
        port: dbPort
    }
)

export default sequelizeConnection;