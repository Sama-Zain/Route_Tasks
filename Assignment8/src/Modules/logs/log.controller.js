import {Router} from "express";
import * as logService from "./log.service.js";
const router= Router();
router.post("/logs/capped",logService.createlogs); //http://localhost:3000/collection/logs/capped
router.post("/logs",logService.insertlogs); //http://localhost:3000/collection/logs
export default router;
