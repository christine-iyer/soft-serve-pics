const ImageUploadRouter = require("express").Router();
const { UploadImage } = require("../controllers/uploadImageRoute");
const parser = require("../middleware/cloudinary.config");
ImageUploadRouter.post("/image", parser.single("image"), UploadImage);
module.exports = ImageUploadRouter;