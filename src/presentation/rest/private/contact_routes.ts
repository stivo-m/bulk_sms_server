import { PermissionAction, Resource } from "@prisma/client";
import express from "express";
import { RequestWithUser, SystemResponse } from "../../../../types";
import { authorize } from "../../../application/middleware/auth_middleware/authorize";
import ContactUsecase from "../../../application/usecases/contact_usecase";
import {
	createContactValidation,
	createManyContactListValidationSchema,
} from "../../../domain/core/validations/contact_list_validation";
import ContactRepository from "../../../infrastructure/repository/contact_repository";

const contactsRouter = express.Router();
const usecase: ContactUsecase = new ContactUsecase(new ContactRepository());

contactsRouter.get(
	"/",
	authorize({ action: PermissionAction.read, resource: Resource.contacts }),
	async (_, res) => {
		const response = await usecase.findContacts();
		return res.status(response.status).json(response.data);
	},
);

contactsRouter.get(
	"/:id",
	authorize({ action: PermissionAction.read, resource: Resource.contacts }),
	async (req, res) => {
		const { id } = req.params;
		const response = await usecase.findContactByID(id);
		return res.status(response.status).json(response.data);
	},
);

contactsRouter.delete(
	"/:id",
	authorize({ action: PermissionAction.read, resource: Resource.contacts }),
	async (req, res) => {
		const { id } = req.params;
		const response = await usecase.deleteContact(id);
		return res.status(response.status).json(response.data);
	},
);

contactsRouter.post(
	"/",
	authorize({
		action: PermissionAction.create,
		resource: Resource.contact_groups,
	}),
	async (req: RequestWithUser, res) => {
		try {
			const payload = await createContactValidation.validate(req.body, {
				abortEarly: false,
				stripUnknown: true,
			});

			const response = await usecase.createContact({
				...payload,
				created_by_id: req.user!.id,
			});

			return res.status(response.status).json(response.data);
		} catch (error) {
			const err: SystemResponse = {
				status: 422,
				data: {
					title: "Validation Error",
					message: "One or more fields are invalid",
					details: error,
				},
			};
			return res.status(err.status).json(err);
		}
	},
);

contactsRouter.post(
	"/multiple",
	authorize({
		action: PermissionAction.create,
		resource: Resource.contact_groups,
	}),
	async (req: RequestWithUser, res) => {
		try {
			const payload = await createManyContactListValidationSchema.validate(
				req.body,
				{
					abortEarly: false,
					stripUnknown: true,
				},
			);

			const response = await usecase.createManyContacts({
				...payload,
				created_by_id: req.user!.id,
			});

			return res.status(response.status).json(response.data);
		} catch (error) {
			const err: SystemResponse = {
				status: 422,
				data: {
					title: "Validation Error",
					message: "One or more fields are invalid",
					details: error,
				},
			};
			return res.status(err.status).json(err);
		}
	},
);

export default contactsRouter;
