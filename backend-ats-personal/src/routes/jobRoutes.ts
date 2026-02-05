import { Router } from "express";
import { createJob, getJobs } from "../controllers/jobController";
import { protect, authorize } from "../middleware/authMiddleware";

const router = Router();

// Solo admin y reclutadores pueden crear vacantes
router.post("/", protect, authorize("admin", "recruiter"), createJob);
// Todos los usuarios logueados pueden ver las vacantes
router.get("/", protect, getJobs);

export default router;