import { PermissionAction, Resource } from "@prisma/client";
import * as yup from "yup";
export const permissionValidationSchema = yup.object({
	role_id_permission_id: yup.string().required().uuid(),
	name: yup.string().max(255).required(),
	description: yup.string().max(255).nullable().required(),
	resource: yup
		.string()
		.oneOf([
			Resource.contact_groups,
			Resource.contacts,
			Resource.messages,
			Resource.permissions,
			Resource.roles,
			Resource.user_accounts,
		])
		.required(),
	actions: yup
		.array()
		.of(
			yup
				.string()
				.oneOf([
					PermissionAction.create,
					PermissionAction.read,
					PermissionAction.update,
					PermissionAction.delete,
				])
				.required(),
		)
		.required()
		.min(1),
});
