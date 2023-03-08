import { UserAccount } from "@prisma/client";
import { SystemResponse } from "../../../types";
import {
	CreateUserAccountInput,
	IUserAccountInterface,
	LoginInput,
} from "../../domain/interfaces/user_account_interface";
import { comparePasswords, signJWT } from "../utils/encryption_utils";

export default class UserAccountUsecases {
	repository: IUserAccountInterface;

	constructor(repository: IUserAccountInterface) {
		this.repository = repository;
	}

	async createUser(input: CreateUserAccountInput) {
		return this.repository.createUserAccount(input);
	}

	async findUsers() {
		return this.repository.findUsers();
	}

	async findUserByEmail(email: string) {
		return this.repository.findUserByEmail(email);
	}

	async findUserById(id: string) {
		return this.repository.findUserById(id);
	}

	async deleteUser(id: string) {
		return this.repository.deleteUserAccount(id);
	}

	async loginUser(input: LoginInput) {
		const response = await this.repository.findUserByEmail(input.email_address);

		if (
			response.status != 200 ||
			(response.data as UserAccount) == null ||
			(response.data as UserAccount) == undefined
		)
			return response;

		// user account exists
		const user = response.data as UserAccount;
		const matchesPassword = comparePasswords(input.password, user.password);

		if (!matchesPassword) {
			const res: SystemResponse = {
				status: 403,
				data: {
					title: "Either username or password is incorrect",
					message:
						"Unfortunately, we cannot access your details at the moment. Please try again later",
				},
			};
			return res;
		}

		type UserAccountData = Partial<UserAccount>;
		let account: UserAccountData = user;
		delete account.password;

		// create a token
		const token = signJWT({ id: user.id }, { expiresIn: "24h" });

		// passwords have matched
		const data: SystemResponse = {
			status: 200,
			data: {
				token,
				user: account,
			},
		};

		return data;
	}
}
