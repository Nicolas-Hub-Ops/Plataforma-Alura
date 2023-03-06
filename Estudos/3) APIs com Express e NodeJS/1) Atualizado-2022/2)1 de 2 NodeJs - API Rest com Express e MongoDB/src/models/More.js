import mongoose from "mongoose";

const moreSchema = new mongoose.Schema(
    {
        id: {type: String},
        cor: {type: String, required: true},
        motor: {type: String, required: true},
        potencia: {type: String, required: true},
        quilometragem: {type: String, required: true},
        ano: {type: String, required: true},
        imagens: {type: Array, required: true}
    },
    {
        versionKey: false
    }
)

const more = mongoose.model("mores", moreSchema)

export default more;