import * as yup from "yup";
import {
	emailValidationSchema,
	mobileNumberValidationSchema,
} from "./shared/shared_validations";
export const contactValidationSchema = yup.object({
	surname: yup.string().required().max(255),
	other_names: yup.string().required().max(255),
	phone_number: mobileNumberValidationSchema.required(),
	email_address: emailValidationSchema.required(),
});

export const createContactValidation = yup.object({
	group_id: yup.string().uuid().required(),
	contact: contactValidationSchema.required(),
});

export const createManyContactListValidationSchema = yup.object({
	group_id: yup.string().uuid().required(),
	contacts: yup.array().of(contactValidationSchema).min(1),
});
