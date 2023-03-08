import express from "express";
import PermissionUsecases from "../../../application/usecases/permission_usecases";
import PermissionRepository from "../../../infrastructure/repository/permissions_repository";
const permissionRouter = express.Router();
const usecase: PermissionUsecases = new PermissionUsecases(
	new PermissionRepository(),
);

permissionRouter.get("/", async (_, res) => {
	const response = await usecase.findPermissions();
	return res.status(response.status).json(response.data);
});

permissionRouter.get("/:id", async (req, res) => {
	const { id } = req.params;
	const response = await usecase.findPermission(id);
	return res.status(response.status).json(response.data);
});

export default permissionRouter;
