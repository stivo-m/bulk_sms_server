import { generateHashedPassword } from "../../../../../../application/utils/encryption_utils";
import { db } from "../../../db";

const userSeeder = async () => {
	const role = await db.role.findFirst({ where: { type: "system_generated" } });
	return await db.userAccount.create({
		data: {
			email_address: "maichstivo254@gmail.com", // You can add your email here instead for testing
			password: await generateHashedPassword("maichstivo254@gmail.com"),
			first_name: "Steven",
			last_name: "Maina",
			status: "active",
			role_id: role!.id,
		},
	});
};

export default userSeeder;
