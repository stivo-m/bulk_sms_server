import { PermissionAction, PermissionsOnRoles, Resource } from "@prisma/client";
import { NextFunction, Response } from "express";
import { RequestWithUser, SystemResponse } from "../../../../types";

export type AuthorizeType = {
	resource: Resource;
	action: PermissionAction;
};

export const authorize = (type: AuthorizeType) => {
	return async (req: RequestWithUser, res: Response, next: NextFunction) => {
		if (req.user == null || req.user == undefined) {
			const error: SystemResponse = {
				status: 401,
				data: {
					title: "Unauthenticated",
					message:
						"You are not logged in and cannot perform this operation at the moment",
				},
			};
			return res.status(error.status).json(error);
		}

		// user is already authenticated
		const permissions = (req.user as any)?.role
			.permissions as PermissionsOnRoles[];
		const permission = permissions.find((permission) => {
			return (permission as any).permissions.resource == type.resource;
		});
		if (permission === null || permission === undefined) {
			const error: SystemResponse = {
				status: 401,
				data: {
					title: "Unauthorized",
					message: "You are not authorized to take this action",
				},
			};
			return res.status(error.status).json(error);
		}

		const canTakeAction = (permission as any).permissions.actions.some(
			(action: PermissionAction) => action === type.action,
		);

		if (!canTakeAction) {
			const error: SystemResponse = {
				status: 401,
				data: {
					title: "Unauthorized",
					message: "You are not authorized to take this action",
				},
			};
			return res.status(error.status).json(error);
		}

		return next();
	};
};
