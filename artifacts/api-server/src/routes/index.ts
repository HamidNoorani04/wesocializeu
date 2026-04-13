import { Router, type IRouter } from "express";
import healthRouter from "./health";
import servicesRouter from "./services";
import creatorsRouter from "./creators";
import caseStudiesRouter from "./case-studies";
import blogRouter from "./blog";
import enquiriesRouter from "./enquiries";
import adminRouter from "./admin";
import statsRouter from "./stats";

const router: IRouter = Router();

router.use(healthRouter);
router.use(servicesRouter);
router.use(creatorsRouter);
router.use(caseStudiesRouter);
router.use(blogRouter);
router.use(enquiriesRouter);
router.use(adminRouter);
router.use(statsRouter);

export default router;
