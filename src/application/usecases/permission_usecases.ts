import { IPermissionInterface } from "../../domain/interfaces/permissions_interface";

export default class PermissionUsecases {
	repository: IPermissionInterface;

	constructor(repository: IPermissionInterface) {
		this.repository = repository;
	}

	/**
	 * Fetch all permissions
	 */
	async findPermissions() {
		return this.repository.findPermissions();
	}

	/**
	 * Fetch permission by id
	 */
	async findPermission(id: string) {
		return this.repository.findPermission(id);
	}
}
