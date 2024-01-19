import mongoose from "mongoose";
const ImgeSchema = new mongoose.Schema({
    imageURL: {
        type: Buffer,
        default: null,
        required: true,
    },
});
const Image = mongoose.model("image", ImgeSchema);
export default Image;
