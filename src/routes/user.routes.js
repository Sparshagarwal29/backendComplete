import { Router } from "express";
import { registerUser } from "../controller/user.controller.js";
import {upload} from "../middlewares/multer.middleware.js"


const router = Router()
router.route("/register").post(
    upload.fields([
        {
            name:"avatar",
            maxCount:1 //how many files would be accepted
        },{
            name:"coverImage",
            maxCount:1}
    ]),
    registerUser
)
 
//http://localhost:8000/api/v1/user/register
export default router