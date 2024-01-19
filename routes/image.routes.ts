import { Router, Request, Response, NextFunction } from "express";
import image from "../controllers/image.controllers.js";
import upload from "../middlewares/image.middlewares.js";
import helpers from "../helpers.js";

const router = Router();

// upload image route
router.post(
  "/upload",
  upload.single("image"),
  image.uploadImage,
  (err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(400).send(helpers.sendError(err.message, 400));
    next();
  }
);

// get image route
router.get("/get_image/:id", image.getImage);

export default router;
