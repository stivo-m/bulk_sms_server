import {
	CreateContactGroupInput,
	IContactGroupInterface,
	UpdateContactGroupInput,
} from "../../domain/interfaces/contact_group_interface";

export default class ContactGroupUsecase {
	repository: IContactGroupInterface;

	constructor(repository: IContactGroupInterface) {
		this.repository = repository;
	}

	/**
	 * Create contact group
	 */
	async createContactGroup(input: CreateContactGroupInput) {
		return this.repository.createContactGroup(input);
	}

	/**
	 * Update contact group
	 */
	async updateContactGroup(input: UpdateContactGroupInput) {
		return this.repository.updateContactGroup(input);
	}

	/**
	 * Fetch all contact groups
	 */
	async findContactGroups() {
		return this.repository.findContactGroups();
	}

	/**
	 * Fetch contact group by id
	 */
	async findContactGroupByID(id: string) {
		return this.repository.findContactGroupByID(id);
	}

	/**
	 * Delete contact group by id
	 */
	async deleteContactGroup(id: string) {
		return this.repository.deleteContactGroup(id);
	}
}
