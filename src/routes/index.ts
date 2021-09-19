import { Router } from "express";
import { authenticateRouter } from "./authenticate.routes";
import { categoriesRoutes } from "./categories.routes";
import { specificationRoutes } from "./specifications.routes";
import { userRouter } from "./user.routes";

const router = Router();

router.use("/categories",categoriesRoutes);
router.use("/specifications",specificationRoutes);
router.use("/users",userRouter);
router.use("/sessions",authenticateRouter);

export { router };