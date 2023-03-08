import { InferType } from "yup";
import { SystemResponse } from "../../../types";
import { userAccountValidationSchema } from "../core/validations/auth_validations";

export type CreateUserAccountInput = InferType<
	typeof userAccountValidationSchema
>;

export type UpdateUserAccountInput = Partial<CreateUserAccountInput> & {
	id: string;
};

export type LoginInput = Pick<
	CreateUserAccountInput,
	"email_address" | "password"
>;

export interface IUserAccountInterface {
	findUserByEmail(email: string): Promise<SystemResponse>;
	findUserById(id: string): Promise<SystemResponse>;
	createUserAccount(input: CreateUserAccountInput): Promise<SystemResponse>;
	updateUserAccount(input: UpdateUserAccountInput): Promise<SystemResponse>;
	deleteUserAccount(id: string): Promise<SystemResponse>;
	loginUser(input: LoginInput): Promise<SystemResponse>;
}
