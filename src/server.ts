import "reflect-metadata";
import bootstrap from "./application/bin/app";
require("dotenv").config();
/**
 * The bootstrap function starts up the server and sets
 * all the necessary dependencies, routing and database connections
 * necessary for the application to run successfully.
 */

bootstrap();
