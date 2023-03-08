import { Status } from "@prisma/client";
import { SystemResponse } from "../../../types";
import { generateHashedPassword } from "../../application/utils/encryption_utils";
import {
	CreateUserAccountInput,
	IUserAccountInterface,
	UpdateUserAccountInput,
} from "../../domain/interfaces/user_account_interface";
import { db } from "../services/database/db";

export class UserAccountRepository implements IUserAccountInterface {
	lookupUserAndPassword(email: string): Promise<SystemResponse> {
		throw new Error("Method not implemented.");
	}
	async findUsers(): Promise<SystemResponse> {
		try {
			const data = await db.userAccount.findMany({});
			return {
				status: 200,
				data,
			};
		} catch (error) {
			return {
				status: 500,
				data: {
					title: "Server Error",
					message:
						"We are unable to process your request at the moment. Please try again later",
					details: error,
				},
			};
		}
	}
	async findUserByEmail(email: string): Promise<SystemResponse> {
		try {
			const data = await db.userAccount.findUnique({
				where: { email_address: email },
				include: {
					role: {
						include: {
							permissions: {
								include: {
									permissions: true,
								},
							},
						},
					},
				},
			});
			return {
				status: 200,
				data,
			};
		} catch (error) {
			return {
				status: 500,
				data: {
					title: "Server Error",
					message:
						"We are unable to process your request at the moment. Please try again later",
					details: error,
				},
			};
		}
	}
	async findUserById(id: string): Promise<SystemResponse> {
		try {
			const data = await db.userAccount.findUnique({
				where: { id: id },
				include: {
					role: {
						include: {
							permissions: {
								include: {
									permissions: true,
								},
							},
						},
					},
				},
			});
			return {
				status: 200,
				data,
			};
		} catch (error) {
			return {
				status: 500,
				data: {
					title: "Server Error",
					message:
						"We are unable to process your request at the moment. Please try again later",
					details: error,
				},
			};
		}
	}
	async createUserAccount(
		input: CreateUserAccountInput,
	): Promise<SystemResponse> {
		try {
			const data = await db.userAccount.create({
				data: {
					email_address: input.email_address,
					first_name: input.first_name,
					last_name: input.last_name,
					password: await generateHashedPassword(input.password),
					status: input.status as Status,
					role_id: input.role_id,
				},
			});
			return {
				status: 200,
				data,
			};
		} catch (error) {
			return {
				status: 500,
				data: {
					title: "Server Error",
					message:
						"We are unable to process your request at the moment. Please try again later",
					details: error,
				},
			};
		}
	}
	async updateUserAccount(
		input: UpdateUserAccountInput,
	): Promise<SystemResponse> {
		throw new Error("Method not implemented.");
	}
	async deleteUserAccount(id: string): Promise<SystemResponse> {
		try {
			const data = await db.userAccount.delete({
				where: { id: id },
			});
			return {
				status: 200,
				data,
			};
		} catch (error) {
			return {
				status: 500,
				data: {
					title: "Server Error",
					message:
						"We are unable to process your request at the moment. Please try again later",
					details: error,
				},
			};
		}
	}
}
