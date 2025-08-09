import { Router } from "express";
import { getMockingPets } from "../controllers/mocks.controller";
import { getMockingUsers } from "../controllers/mocks.controller";

const router = Router();

router.get("/mockingpets", getMockingPets);
router.get("/mockingusers", getMockingUsers);

export default router;
