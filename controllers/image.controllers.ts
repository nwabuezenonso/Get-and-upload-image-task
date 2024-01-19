import { Request, Response } from "express";
import Image from "../models/image.models.js";
import helpers from "../helpers.js";

// upload image handler
const uploadImage = async (req: Request, res: Response) => {
  try {
    const file = req.file;

    // check if the file and buffer exist
    if (file && file.buffer) {
      //save the image to a database
      await Image.create({ imageURL: file.buffer });

      return res
        .status(201)
        .json(helpers.sendSuccess("Image has been uploaded successfully", 200));
    }

    return helpers.newError(
      "Image file does not exist, upload an image to get started ",
      404
    );
  } catch (error: any) {
    if (error.status) {
      return res
        .status(error.status)
        .json(helpers.sendError(error.message, error.status));
    }

    return res.status(500).json(helpers.sendError(error, 500));
  }
};

// get image handler
const getImage = async (req: Request, res: Response) => {
  try {
    // find image by id
    const img = await Image.findById(req.params.id);

    // if image cannot be found
    if (!img) {
      helpers.newError("Image does not exist", 404);
      return;
    }

    // set the responser headers
    res.set("Content-Type", "image/jpg");

    // send the image in a URL format
    res.send(img.imageURL);
    return;
  } catch (error: any) {
    if (error.status) {
      return res
        .status(error.status)
        .json(helpers.sendError(error.message, error.status));
    }

    return res.status(500).json(helpers.sendError(error, 500));
  }
};

export default { uploadImage, getImage };
