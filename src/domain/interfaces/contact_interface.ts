import { InferType } from "yup";
import { SystemResponse } from "../../../types";

import {
	createContactValidation,
	createManyContactListValidationSchema,
} from "../core/validations/contact_list_validation";

export type CreateContactInput = InferType<typeof createContactValidation> & {
	created_by_id: string;
};
export type CreateManyContactInput = InferType<
	typeof createManyContactListValidationSchema
> & {
	created_by_id: string;
};

export interface IContactInterface {
	findContacts(): Promise<SystemResponse>;
	findContactByID(id: string): Promise<SystemResponse>;
	createContact(input: CreateContactInput): Promise<SystemResponse>;
	createManyContacts(input: CreateManyContactInput): Promise<SystemResponse>;
	deleteContact(id: string): Promise<SystemResponse>;
}
