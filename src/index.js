import dotenv from 'dotenv';
dotenv.config({ path: './.env'});
import connectDB from "./db/index.js";


connectDB()
.then(() =>{
    app.listen(process.env.PORT || 4000, () =>{
        console.log(` server is running on ${process.env.PORT}`);
    })

})
.catch((err) => {
    console.log("mongo db connection failed !!",err);
})

















/*
import express from "express"
const app = express()

(async () =>{
    try{
    await  mongoose.connect(`${process.env.MONFOBB_URL}/${DB_name}`)
    app.on("erroe", (error) =>{
        console.log("ERRR:" , error);
        throw  error
    });
     app.listen(process.env.PORT, () =>{
        console.log(`app is listening on port ${process.env.PORT}`);
     })
    }catch(error){
        console.error("ERROR: ", error)
    throw err 
  }
})() */
