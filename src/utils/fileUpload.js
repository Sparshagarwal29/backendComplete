import { v2 } from "cloudinary";
import fs from "fs";

v2.config({ 
    cloud_name: 'process.env.CLOUDNARY_CLOUD_NAME', 
    api_key: 'process.env.CLOUDNARY_API_KEY', 
    api_secret: 'process.env.CLOUDNARY_API_SECRET'
});

const uploadOnCloudnary= async (loccalFilePath) =>{
    try {
        if(!loccalFilePath) return null;
        //uplod the file on cloudnary
        const response = await v2.uploader.upload(loccalFilePath,{
            resource_type: "auto"
        })
        console.log("file is uploaded", response.url);
        return response;
    } catch (error) {
        fs.unlinkSync(loccalFilePath)//this unlinkSync would clear all locally saved temporary file as uploa opreation got failed
        return null;
    }
}
export{uploadOnCloudnary }