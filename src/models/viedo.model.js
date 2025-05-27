import mongoose, {Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const viedoSchema = new Schema(
    {
        viedoFile:{
            type: String,
            required: true
        },
        thumbnail:{
            type: String,
            required: true
        },
        title:{
            type: String,
            required: true
        },
        discription:{
            type: String,
            required: true
        },
        duration:{
            type: Number,
            required: true
        },
        views:{
            types: Number,
            default: 0
        },
        isPublished:{
            type:Boolean,
            default:true
        },
        owner:{
            type: Schema.Types.ObjectId,
            ref:"User"
        }
    },{
        timestamps: true
    }
)
viedoSchema.plugin(mongooseAggregatePaginate)
export const Viedo = mongoose.model("viedo",viedoSchema)
