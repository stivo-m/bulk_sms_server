import { PermissionAction, Resource } from "@prisma/client";
import express from "express";
import { authorize } from "../../../application/middleware/auth_middleware/authorize";
import PermissionUsecases from "../../../application/usecases/permission_usecases";
import PermissionRepository from "../../../infrastructure/repository/permissions_repository";
const permissionRouter = express.Router();
const usecase: PermissionUsecases = new PermissionUsecases(
	new PermissionRepository(),
);

permissionRouter.get(
	"/",
	authorize({ action: PermissionAction.read, resource: Resource.permissions }),
	async (_, res) => {
		const response = await usecase.findPermissions();
		return res.status(response.status).json({ data: response.data });
	},
);

permissionRouter.get(
	"/:id",
	authorize({ action: PermissionAction.read, resource: Resource.permissions }),
	async (req, res) => {
		const { id } = req.params;
		const response = await usecase.findPermission(id);
		return res.status(response.status).json({ data: response.data });
	},
);

export default permissionRouter;
