import { PermissionAction, Resource } from "@prisma/client";
import express from "express";
import { SystemResponse } from "../../../../types";
import { authenticate } from "../../../application/middleware/auth_middleware/authenticate";
import { authorize } from "../../../application/middleware/auth_middleware/authorize";
import UserAccountUsecases from "../../../application/usecases/user_account_usecases";
import {
	userAccountValidationSchema,
	userLoginValidationSchema,
} from "../../../domain/core/validations/auth_validations";
import { UserAccountRepository } from "../../../infrastructure/repository/user_account_repository";
const userAccountRouter = express.Router();
const usecase: UserAccountUsecases = new UserAccountUsecases(
	new UserAccountRepository(),
);

userAccountRouter.get(
	"/",
	authenticate,
	authorize({
		action: PermissionAction.read,
		resource: Resource.user_accounts,
	}),
	async (_, res) => {
		const response = await usecase.findUsers();
		return res.status(response.status).json({ data: response.data });
	},
);

userAccountRouter.get(
	"/:id",
	authenticate,
	authorize({
		action: PermissionAction.read,
		resource: Resource.user_accounts,
	}),
	async (req, res) => {
		const { id } = req.params;
		const response = await usecase.findUserById(id);
		return res.status(response.status).json({ data: response.data });
	},
);

userAccountRouter.get(
	"/email/:email",
	authenticate,
	authorize({
		action: PermissionAction.read,
		resource: Resource.user_accounts,
	}),
	async (req, res) => {
		const { email } = req.params;
		const response = await usecase.findUserByEmail(email);
		return res.status(response.status).json({ data: response.data });
	},
);

userAccountRouter.post(
	"/",
	authenticate,
	authorize({
		action: PermissionAction.create,
		resource: Resource.user_accounts,
	}),
	async (req, res) => {
		try {
			const payload = await userAccountValidationSchema.validate(req.body, {
				abortEarly: false,
				stripUnknown: true,
			});

			const response = await usecase.createUser(payload);
			return res.status(response.status).json({ data: response.data });
		} catch (error) {
			const err: SystemResponse = {
				status: 401,
				data: {
					title: "Unable to verify your identity",
					message:
						"Unfortunately, we cannot access your details at the moment. Please try again later",
					details: error,
				},
			};
			return res.status(err.status).json(err);
		}
	},
);

userAccountRouter.post("/login", async (req, res) => {
	try {
		const payload = await userLoginValidationSchema.validate(req.body, {
			abortEarly: false,
		});

		const response = await usecase.loginUser(payload);
		return res.status(response.status).json({ data: response.data });
	} catch (error) {
		const err: SystemResponse = {
			status: 401,
			data: {
				title: "One or more validations",
				message:
					"Unfortunately, we cannot access your details at the moment. Please try again later",
				details: error,
			},
		};
		return res.status(err.status).json(err);
	}
});

export default userAccountRouter;
