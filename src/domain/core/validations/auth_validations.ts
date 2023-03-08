import { Status } from "@prisma/client";
import * as yup from "yup";
import { emailValidationSchema } from "./shared/shared_validations";
export const userAccountValidationSchema = yup.object({
	role_id: yup.string().uuid().required(),
	first_name: yup.string().required().max(255),
	last_name: yup.string().required().max(255),
	email_address: emailValidationSchema,
	password: yup.string().required().min(6),
	status: yup
		.string()
		.nullable()
		.oneOf([Status.active, Status.suspended])
		.required(),
});

export const userLoginValidationSchema = yup.object({
	email_address: emailValidationSchema,
	password: yup.string().required().min(6),
});
