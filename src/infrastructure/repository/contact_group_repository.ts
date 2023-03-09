import { SystemResponse } from "../../../types";
import {
	CreateContactGroupInput,
	IContactGroupInterface,
	UpdateContactGroupInput,
} from "../../domain/interfaces/contact_group_interface";
import { db } from "../services/database/db";

export class ContactGroupRepository implements IContactGroupInterface {
	async findContactGroups(): Promise<SystemResponse> {
		try {
			const data = await db.contactGroup.findMany({
				include: {
					_count: true,
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
					title: "Unfortunately, a server error has occurred",
					message: "Unfortunately, a server error has occurred",
					details: error,
				},
			};
		}
	}
	async findContactGroupByID(id: string): Promise<SystemResponse> {
		try {
			const data = await db.contactGroup.findUnique({
				where: { id: id },
				include: {
					contacts: {
						include: {
							contact: true,
						},
					},
					created_by: {
						select: {
							id: true,
							first_name: true,
							last_name: true,
							email_address: true,
							status: true,
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
					title: "Unfortunately, a server error has occurred",
					message: "Unfortunately, a server error has occurred",
					details: error,
				},
			};
		}
	}
	async createContactGroup(
		input: CreateContactGroupInput,
	): Promise<SystemResponse> {
		try {
			const data = await db.contactGroup.create({
				data: {
					name: input.name,
					description: input.description,
					created_by_id: input.created_by_id,
				},
				include: {
					_count: true,
				},
			});
			return {
				status: 201,
				data,
			};
		} catch (error) {
			return {
				status: 500,
				data: {
					title: "Unfortunately, a server error has occurred",
					message: "Unfortunately, a server error has occurred",
					details: error,
				},
			};
		}
	}
	async updateContactGroup(
		input: UpdateContactGroupInput,
	): Promise<SystemResponse> {
		try {
			const data = await db.contactGroup.update({
				where: { id: input.id },
				data: {
					name: input.name,
					description: input.description,
					created_by_id: input.created_by_id,
				},
			});
			return {
				status: 201,
				data,
			};
		} catch (error) {
			return {
				status: 500,
				data: {
					title: "Unfortunately, a server error has occurred",
					message: "Unfortunately, a server error has occurred",
					details: error,
				},
			};
		}
	}
	async deleteContactGroup(id: string): Promise<SystemResponse> {
		try {
			const data = await db.contactGroup.delete({ where: { id: id } });
			return {
				status: 200,
				data,
			};
		} catch (error) {
			return {
				status: 500,
				data: {
					title: "Unfortunately, a server error has occurred",
					message: "Unfortunately, a server error has occurred",
					details: error,
				},
			};
		}
	}
}
