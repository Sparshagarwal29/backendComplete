import mongoose, { connect } from "mongoose";
import {DB_name} from "../constants.js";


const connectDB =  async () =>{
    try{
      const conectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_name}`)

      console.log(`/n Mongoose connect : ${conectionInstance.connection.host}`)

    
    }catch(error){
        console.log("MONGODB connection error", error)
        process.exit(1)
    }
}
         
export default connectDB
