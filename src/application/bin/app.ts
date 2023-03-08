import express from "express";

import cors from "cors";
import morganMiddleware from "../middleware/loggers/morgan_middleware";
import Logger from "../middleware/loggers/logger";
import router from "../../presentation/rest/router";

export default async function bootstrap() {
	const port: any = process.env.PORT || 4000;

	// init express
	const app = express();
	const corsOptions: cors.CorsOptions = {
		origin: ["*", process.env.CLIENT_URL!],
		credentials: true,
	};
	app.use(cors(corsOptions));
	app.use(express.json());

	// Logging
	app.use(morganMiddleware);

	// Routes
	app.use("/api/v1", router);

	// listen on a given port for express server
	app.listen({ port }, () => {
		Logger.debug(`Server started at ${process.env.SERVER_URL}:${port}`);
	});
}
