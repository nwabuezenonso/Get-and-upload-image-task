var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Image from "../models/image.models.js";
import helpers from "../helpers.js";
// upload image handler
const uploadImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const file = req.file;
        // check if the file and buffer exist
        if (file && file.buffer) {
            //save the image to a database
            yield Image.create({ imageURL: file.buffer });
            return res
                .status(201)
                .json(helpers.sendSuccess("Image has been uploaded successfully", 200));
        }
        return helpers.newError("Image file does not exist, upload an image to get started ", 404);
    }
    catch (error) {
        if (error.status) {
            return res
                .status(error.status)
                .json(helpers.sendError(error.message, error.status));
        }
        return res.status(500).json(helpers.sendError(error, 500));
    }
});
// get image handler
const getImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // find image by id
        const img = yield Image.findById(req.params.id);
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
    }
    catch (error) {
        if (error.status) {
            return res
                .status(error.status)
                .json(helpers.sendError(error.message, error.status));
        }
        return res.status(500).json(helpers.sendError(error, 500));
    }
});
export default { uploadImage, getImage };
