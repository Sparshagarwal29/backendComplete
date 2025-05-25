import mongoose, {Schema} from "mongoose";
import { JsonWebTokenError } from "jsonwebtoken";
import bcrypt from "bcrypt";
const userSchema =new Schema(
    {
        username:{
            type:String,
            required: true,
            unique:true,
            lowercase:true,
            trim: true,
            index: true
        },
        email:{
            type:String,
            required: true,
            unique:true,
            lowercase:true,
            trim: true,
        },
        fullnsme:{
            type:String,
            required: true,
            trim: true,
            index: true
        },
        avatar:{
            type:String,
            required: true,
        },
        coverImage:{
            type:String
        },
        watchHistory:
        [
            {
                type: Schema.Types.ObjectId,
                ref:"Viedo"

            }
        ],
        password:{
            type: String,
            required: [true, 'password is required']

        },
        refreshToken:{
            type: String
        }
    },
    {
        timestamps: true
    }
)

userSchema.pre("save", async function (next) {
    if(this.isModified("password"))
    {this.password =bcrypt.hash(this.password, 10);
    next();}
    else {
       return next();
    }
})

userSchema.methods.isPasswordCorrect = async function (password) {
  return  await bcrypt.compare(password,this.password)
}
userSchema.method.generateAccessToken =function(){
    return JsonWebTokenError.sign(
        {
            _id: this._id,
            username: this.username
        },
        process.env.ACCESS_TOKEN_SECRET,{
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        } 
    )
}
userSchema.method.generateRefreshToken =function(){
    return JsonWebTokenError.sign(
        {
            _id: this._id,
            username: this.username
        },
        process.env.REFFRESH_TOKEN_SECRET,{
            expiresIn:process.env.REFFRESH_TOKEN_EXPIRY
        } 
    )
}

export const User = mongoose.model("User", userSchema);  