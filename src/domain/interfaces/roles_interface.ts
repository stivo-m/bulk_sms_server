import { InferType } from "yup";
import { SystemResponse } from "../../../types";
import { roleValidationSchema } from "../core/validations/roles_validation";

export type CreateRoleInput = InferType<typeof roleValidationSchema>;

export type UpdateRoleInput = Partial<CreateRoleInput> & {
	id: string;
};

export interface IRoleInterface {
	findRoles(): Promise<SystemResponse>;
	findRole(id: string): Promise<SystemResponse>;
	createRole(input: CreateRoleInput): Promise<SystemResponse>;
	updateRole(input: UpdateRoleInput): Promise<SystemResponse>;
	deleteRole(id: string): Promise<SystemResponse>;
}
