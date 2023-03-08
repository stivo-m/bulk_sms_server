import { InferType } from "yup";
import { SystemResponse } from "../../../types";
import {
	userAccountValidationSchema,
	userLoginValidationSchema,
} from "../core/validations/auth_validations";

export type CreateUserAccountInput = InferType<
	typeof userAccountValidationSchema
>;

export type UpdateUserAccountInput = Partial<CreateUserAccountInput> & {
	id: string;
};

export type LoginInput = InferType<typeof userLoginValidationSchema>;

export interface IUserAccountInterface {
	lookupUserAndPassword(email: string): Promise<SystemResponse>;
	findUserByEmail(email: string): Promise<SystemResponse>;
	findUserById(id: string): Promise<SystemResponse>;
	findUsers(): Promise<SystemResponse>;
	createUserAccount(input: CreateUserAccountInput): Promise<SystemResponse>;
	updateUserAccount(input: UpdateUserAccountInput): Promise<SystemResponse>;
	deleteUserAccount(id: string): Promise<SystemResponse>;
}
