import dotenv from 'dotenv';
dotenv.config();

import { v2 as cloudinary } from "cloudinary";
import fs from "fs"; 
cloudinary.config({ 
    cloud_name:process.env.CLOUDNARY_CLOUD_NAME, 
    api_key:process.env.CLOUDNARY_API_KEY, 
    api_secret:process.env.CLOUDNARY_API_SECRET
});
const uploadOnCloudnary= async (localFilePath) =>{
    try {
        if(!localFilePath) return null;
        //uplod the file on cloudnary
        const response = await cloudinary.uploader.upload(localFilePath,{
            resource_type: "auto"
        })
        // console.log("file is uploaded", response);
        fs.unlinkSync(localFilePath);
        return response;
    } catch (error) {
        fs.unlinkSync(localFilePath)//this unlinkSync would clear all locally saved temporary file as uploa opreation got failed
        console.error('error uplording fils to cloudnairy', error)
        return null;
    }
}
export{uploadOnCloudnary }