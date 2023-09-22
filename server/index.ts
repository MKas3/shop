import express from "express";
import dotenv from "dotenv";
import sequelizeConnection from "./db";
import cors from "cors";
import router from "./routes";
import errorHandler from "./middleware/errorHandlingMiddleware";
import fileUpload from "express-fileupload";
import path from "path";
import {User} from './models/models';

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'static')));
app.use(fileUpload({}));
app.use('/api', router);

app.use(errorHandler);

const start = async () => {
	try {
		await sequelizeConnection.authenticate();
		await sequelizeConnection.sync();
		app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
	} catch (e) {
		console.error(e);
	}
}

start();