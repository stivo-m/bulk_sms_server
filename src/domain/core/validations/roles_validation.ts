import { RoleType } from "@prisma/client";
import * as yup from "yup";
export const roleValidationSchema = yup.object({
	name: yup.string().max(255).required(),
	description: yup.string().max(255).nullable(),
	type: yup.string().oneOf([RoleType.user_generated]),
	permissions: yup.array().of(yup.string().uuid()).required().min(1),
});
