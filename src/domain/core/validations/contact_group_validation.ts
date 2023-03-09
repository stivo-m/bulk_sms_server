import { Status } from "@prisma/client";
import * as yup from "yup";
export const contactGroupValidationSchema = yup.object({
	name: yup.string().required().max(255),
	description: yup.string().optional().max(255),
	status: yup.string().optional().oneOf([Status.active, Status.suspended]),
});

export const updateContactGroupValidationSchema = yup.object({
	name: yup.string().optional().max(255),
	description: yup.string().optional().max(255),
	status: yup.string().optional().oneOf([Status.active, Status.suspended]),
});
