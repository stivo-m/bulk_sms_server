import { InferType } from "yup";
import { SystemResponse } from "../../../types";
import { permissionValidationSchema } from "../core/validations/permissions_validations";

export type CreatePermissionInput = InferType<
	typeof permissionValidationSchema
>;

export type UpdatePermissionInput = Partial<CreatePermissionInput> & {
	id: string;
};

export type PermissionFilters = {
	role_id: string;
};

export interface IPermissionInterface {
	findPermissions(input?: PermissionFilters): Promise<SystemResponse>;
	findPermission(id: string): Promise<SystemResponse>;
	createPermission(input: CreatePermissionInput): Promise<SystemResponse>;
	updatePermission(input: UpdatePermissionInput): Promise<SystemResponse>;
	deletePermission(id: string): Promise<SystemResponse>;
}
