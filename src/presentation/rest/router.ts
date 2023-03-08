import express from "express";
const router = express.Router();

router.use("/health", (req, res) => {
	return res.status(200).json({ message: "Server is running properly" });
});

export default router;
