import { PermissionAction, Resource } from "@prisma/client";
import { SystemResponse } from "../../../types";
import {
	CreatePermissionInput,
	IPermissionInterface,
	PermissionFilters,
	UpdatePermissionInput,
} from "../../domain/interfaces/permissions_interface";
import { db } from "../services/database/db";

export default class PermissionRepository implements IPermissionInterface {
	async findPermissions(input?: PermissionFilters): Promise<SystemResponse> {
		try {
			if (input === null || input === undefined) {
				const data = await db.permission.findMany();
				return {
					status: 200,
					data,
				};
			} else {
				const data = await db.permission.findMany({
					where: { roles: { every: { role_id: input.role_id } } },
				});
				return {
					status: 200,
					data,
				};
			}
		} catch (error) {
			return {
				status: 500,
				data: {
					title: "We are unable to find all the permissions at the moment",
					message: "An error occurred while fetching permissions",
					details: error,
				},
			};
		}
	}
	async findPermission(id: string): Promise<SystemResponse> {
		try {
			const data = await db.permission.findFirst({ where: { id: id } });
			return {
				status: 200,
				data,
			};
		} catch (error) {
			return {
				status: 500,
				data: {
					title: "We are unable to find all the permissions at the moment",
					message: "An error occurred while fetching permissions",
					details: error,
				},
			};
		}
	}
	async createPermission(
		input: CreatePermissionInput,
	): Promise<SystemResponse> {
		try {
			const response = await db.$transaction(async (tx) => {
				const data = await tx.permission.create({
					data: {
						name: input.name,
						resource: input.resource as Resource,
						actions: input.actions as PermissionAction[],
						description: input.description,
					},
				});

				await tx.permissionsOnRoles.create({
					data: {
						permission_id: data.id,
						role_id: input.role_id_permission_id,
					},
				});

				return data;
			});

			return {
				status: 200,
				data: response,
			};
		} catch (error) {
			return {
				status: 500,
				data: {
					title: "We are unable to find all the permissions at the moment",
					message: "An error occurred while fetching permissions",
					details: error,
				},
			};
		}
	}
	async updatePermission(
		input: UpdatePermissionInput,
	): Promise<SystemResponse> {
		throw new Error("Method not implemented.");
	}
	async deletePermission(id: string): Promise<SystemResponse> {
		try {
			const data = await db.permission.delete({ where: { id: id } });
			return {
				status: 200,
				data,
			};
		} catch (error) {
			return {
				status: 500,
				data: {
					title: "We are unable to find all the permissions at the moment",
					message: "An error occurred while fetching permissions",
					details: error,
				},
			};
		}
	}
}
