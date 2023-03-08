import { NextFunction, Request, Response } from "express";
import { RequestWithUser, SystemResponse } from "../../../../types";
import { db } from "../../../infrastructure/services/database/db";
import { verifyJWT } from "../../utils/encryption_utils";

export const authenticate = async (
	req: RequestWithUser,
	res: Response,
	next: NextFunction,
) => {
	const bearer = req.headers["authorization"];
	if (bearer == null || bearer == undefined) {
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

	const token = bearer.split(" ")[1];

	try {
		const id = verifyJWT<string>(token);
		// fetch the user's details
		const user = await db.userAccount.findUnique({ where: { id: id! } });
		req.user = user;
		return next();
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
};
