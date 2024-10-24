import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
    fullName:{type: String, required: true},
    email: {type: String, required: true, unique: true},
    password:{type: String, required: true}
},
{timestamps: true}
)

UserSchema.set("toJSON",{
    transform(_doc, ret){
        delete ret.password
        delete ret.__v
        ret.ID = ret._id
        delete ret._id
    }
})

const User = mongoose.model("User", UserSchema)
export default User