import express from "express";
import { authenticate } from "../../application/middleware/auth_middleware/authenticate";
import contactGroupRoutes from "./private/contact_group_routes";
import permissionRouter from "./private/permission_routes";
import userAccountRouter from "./private/user_account_routes";
const router = express.Router();

// public routes

// private routes
router.use("/permissions", authenticate, permissionRouter);
router.use("/contact-groups", authenticate, contactGroupRoutes);
router.use("/users", userAccountRouter);

export default router;
