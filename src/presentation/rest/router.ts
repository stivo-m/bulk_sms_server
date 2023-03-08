import express from "express";
import { authenticate } from "../../application/middleware/auth_middleware/authenticate";
import permissionRouter from "./private/permission_routes";
const router = express.Router();

// public routes

// private routes
router.use("/permissions", authenticate, permissionRouter);

export default router;
