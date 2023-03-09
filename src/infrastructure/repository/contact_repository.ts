import { SystemResponse } from "../../../types";
import {
	CreateContactInput,
	CreateManyContactInput,
	IContactInterface,
} from "../../domain/interfaces/contact_interface";
import { db } from "../services/database/db";

export default class ContactRepository implements IContactInterface {
	async findContacts(): Promise<SystemResponse> {
		try {
			const data = await db.contact.findMany({
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
	async findContactByID(id: string): Promise<SystemResponse> {
		try {
			const data = await db.contact.findUnique({
				where: { id: id },
				include: {
					_count: true,
					created_by: {
						select: {
							id: true,
							first_name: true,
							last_name: true,
							email_address: true,
						},
					},
					groups: {
						select: {
							contact_group: {
								select: {
									id: true,
									name: true,
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
					title: "Unfortunately, a server error has occurred",
					message: "Unfortunately, a server error has occurred",
					details: error,
				},
			};
		}
	}
	async createContact(input: CreateContactInput): Promise<SystemResponse> {
		try {
			const response = await db.$transaction(async (tx) => {
				const contact = await tx.contact.create({
					data: {
						...input.contact,
						created_by_id: input.created_by_id,
					},
				});

				await tx.contactsOnGroups.create({
					data: {
						contact_group_id: input.group_id,
						contact_id: contact.id,
					},
				});

				return contact;
			});

			return {
				status: 201,
				data: response,
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
	async createManyContacts(
		input: CreateManyContactInput,
	): Promise<SystemResponse> {
		try {
			await db.$transaction(async (tx) => {
				input!.contacts!.forEach(async (contact) => {
					await tx.contactsOnGroups.create({
						data: {
							contact: {
								create: {
									email_address: contact.email_address,
									phone_number: contact.phone_number,
									surname: contact.surname,
									other_names: contact.other_names,
									created_by_id: input.created_by_id,
								},
							},
							contact_group: {
								connect: {
									id: input.group_id,
								},
							},
						},
					});
				});
			});

			return {
				status: 201,
				data: { message: "Contacts created successfully" },
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
	async deleteContact(id: string): Promise<SystemResponse> {
		try {
			const data = await db.contact.delete({ where: { id } });
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
}
