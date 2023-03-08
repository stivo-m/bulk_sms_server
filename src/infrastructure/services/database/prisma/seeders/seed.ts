import Logger from "../../../../../application/middleware/loggers/logger";
import { db } from "../../db";
import roleAndPermission from "./roles_and_permissions/roles_and_permissions_seeder";
import userSeeder from "./users/users_seeder";

/**
 *
 * The seeder will be used to insert the following items by default:
 *
 *
 * 1. Default roles and permissions
 * 2. Default users

 */
async function main() {
	await roleAndPermission();
	await userSeeder();
}

main()
	.then(async () => {
		await db.$disconnect();
		Logger.info("All seeders have successfully run to completion");
	})
	.catch(async (e) => {
		Logger.error("Unable to run seeders: " + e);
		await db.$disconnect();
		process.exit(1);
	});
