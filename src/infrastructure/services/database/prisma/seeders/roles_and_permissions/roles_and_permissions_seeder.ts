import { db } from "../../../db";

const roleAndPermission = async () => {
	await db.permission.createMany({
		data: [
			{
				name: "All Roles Permissions",
				description: "Provides access to all role-related actions",
				resource: "roles",
				actions: ["create", "read", "update", "delete"],
			},
			{
				name: "All Permissions Permissions",
				description: "Provides access to all permission-related actions",
				resource: "permissions",
				actions: ["create", "read", "update", "delete"],
			},
			{
				name: "All User Account Permissions",
				description: "Provides access to all user-account-related actions",
				resource: "user_accounts",
				actions: ["create", "read", "update", "delete"],
			},
			{
				name: "All Contact Group Permissions",
				description: "Provides access to all contact-group-related actions",
				resource: "contact_groups",
				actions: ["create", "read", "update", "delete"],
			},
			{
				name: "All Contacts Permissions",
				description: "Provides access to all contact-related actions",
				resource: "contacts",
				actions: ["create", "read", "update", "delete"],
			},
			{
				name: "All Messages Permissions",
				description: "Provides access to all messages-related actions",
				resource: "messages",
				actions: ["create", "read", "update", "delete"],
			},
		],
	});

	const permissions = await db.permission.findMany();

	return await db.role.create({
		data: {
			name: "Super Admin",
			description: "This is a super-admin role generated by the system",
			type: "system_generated",
			permissions: {
				createMany: {
					data: permissions.map((permission) => {
						return { permission_id: permission.id };
					}),
				},
			},
		},
	});
};

export default roleAndPermission;