import { PermissionAction, Resource } from "@prisma/client";
import express from "express";
import { RequestWithUser, SystemResponse } from "../../../../types";
import { authorize } from "../../../application/middleware/auth_middleware/authorize";
import ContactGroupUsecase from "../../../application/usecases/contact_group_usecase";
import {
	contactGroupValidationSchema,
	updateContactGroupValidationSchema,
} from "../../../domain/core/validations/contact_group_validation";
import { ContactGroupRepository } from "../../../infrastructure/repository/contact_group_repository";
const contactGroupRoutes = express.Router();
const usecase: ContactGroupUsecase = new ContactGroupUsecase(
	new ContactGroupRepository(),
);

contactGroupRoutes.get(
	"/",
	authorize({
		action: PermissionAction.read,
		resource: Resource.contact_groups,
	}),
	async (_, res) => {
		const response = await usecase.findContactGroups();
		return res.status(response.status).json(response.data);
	},
);

contactGroupRoutes.get(
	"/:id",
	authorize({
		action: PermissionAction.read,
		resource: Resource.contact_groups,
	}),
	async (req, res) => {
		const { id } = req.params;
		const response = await usecase.findContactGroupByID(id);
		return res.status(response.status).json(response.data);
	},
);

contactGroupRoutes.post(
	"/",
	authorize({
		action: PermissionAction.create,
		resource: Resource.contact_groups,
	}),
	async (req: RequestWithUser, res) => {
		try {
			const payload = await contactGroupValidationSchema.validate(req.body, {
				abortEarly: false,
				stripUnknown: true,
			});

			const response = await usecase.createContactGroup({
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

contactGroupRoutes.patch(
	"/:id",
	authorize({
		action: PermissionAction.update,
		resource: Resource.contact_groups,
	}),
	async (req: RequestWithUser, res) => {
		try {
			const payload = await updateContactGroupValidationSchema.validate(
				req.body,
				{
					abortEarly: false,
					stripUnknown: true,
				},
			);
			const { id } = req.params;

			const response = await usecase.updateContactGroup({
				...payload,
				id: id,
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

contactGroupRoutes.delete(
	"/:id",
	authorize({
		action: PermissionAction.delete,
		resource: Resource.contact_groups,
	}),
	async (req, res) => {
		const { id } = req.params;
		const response = await usecase.deleteContactGroup(id);
		return res.status(response.status).json(response.data);
	},
);

export default contactGroupRoutes;
