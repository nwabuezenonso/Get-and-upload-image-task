import multer from "multer";

// validate uploaded images
const upload = multer({
  fileFilter(req, file, cb) {
    // if file does not match extension
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      return cb(
        new Error(
          "Please upload an image file with either jpg, jpeg, png or gif extension"
        )
      );
    }

    // accept the given upload
    cb(null, true);
  },
});

export default upload;
