import { UserAccount } from "@prisma/client";
import { Request } from "express";

type SystemError = {
	title: string;
	message?: string;
	details?: any;
};

type SystemResponse = {
	status: number;
	data: Record<any, any> | null | SystemError;
};

export { SystemError, SystemResponse };

export interface RequestWithUser extends Request {
	user?: UserAccount | null;
}

export type JWTPayload = {
	id: string;
};
