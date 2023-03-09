import * as yup from "yup";

export const mobileNumberValidationSchema = yup
	.string()
	.min(6)
	.max(14)
	.required();

export const emailValidationSchema = yup.string().email().required();
