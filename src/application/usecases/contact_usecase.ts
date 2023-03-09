import {
	CreateContactInput,
	CreateManyContactInput,
	IContactInterface,
} from "../../domain/interfaces/contact_interface";

export default class ContactUsecase {
	repository: IContactInterface;

	constructor(repository: IContactInterface) {
		this.repository = repository;
	}

	/**
	 * Create contact
	 */
	async createContact(input: CreateContactInput) {
		return this.repository.createContact(input);
	}

	/**
	 * Create Many contacts
	 */
	async createManyContacts(input: CreateManyContactInput) {
		return this.repository.createManyContacts(input);
	}

	/**
	 * Fetch all contacts
	 */
	async findContacts() {
		return this.repository.findContacts();
	}

	/**
	 * Fetch contact by id
	 */
	async findContactByID(id: string) {
		return this.repository.findContactByID(id);
	}

	/**
	 * Delete contact by id
	 */
	async deleteContact(id: string) {
		return this.repository.deleteContact(id);
	}
}
