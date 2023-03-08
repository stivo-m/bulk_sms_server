import { InferType } from "yup";
import { SystemResponse } from "../../../types";

import {
	contactGroupValidationSchema,
	updateContactGroupValidationSchema,
} from "../core/validations/contact_group_validation";

export type CreateContactGroupInput = InferType<
	typeof contactGroupValidationSchema
> & {
	created_by_id: string;
};

export type UpdateContactGroupInput = InferType<
	typeof updateContactGroupValidationSchema
> & {
	id: string;
	created_by_id: string;
};

export interface IContactGroupInterface {
	findContactGroups(): Promise<SystemResponse>;
	findContactGroupByID(id: string): Promise<SystemResponse>;
	createContactGroup(input: CreateContactGroupInput): Promise<SystemResponse>;
	updateContactGroup(input: UpdateContactGroupInput): Promise<SystemResponse>;
	deleteContactGroup(id: string): Promise<SystemResponse>;
}
