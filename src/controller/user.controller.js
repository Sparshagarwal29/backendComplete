import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudnary } from "../utils/fileUpload.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async(req,res)=>{
     //resgier user we need :-
    //1) login through frontend 
    //2) validation: everything is not empty 
    //3) user is already exist in database(can check hrough email or username) 
    //4) check for images and avtar (as they are required)
    //5) send all those images to cloudnary , avtar
    //6)create user object --create entry in DB 
    //7)check wheater the user is created and then remove password and refresh token from response 
    //8)resutn response



    //step 1 :
    const {username,fullname,email,password}= req.body
    //step 2:
    if(fullname === ""){
        throw new ApiError(400,"full name is required  ")
    }
    if(username === ""){
        throw new ApiError(400,"username is required  ")
    }
    if(email === ""){
        throw new ApiError(400,"email is required  ")
    }
    if(password === ""){
        throw new ApiError(400,"password is required  ")
    }

    //step 3
    const userExisted = User.findOne({
        $or:[{username},{name}]
    })
    if(userExisted){
        throw new ApiError(409,"username or email existed")
    }

    //step 4:-
    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath= req.files?.coverImage[0]?.path;
    if (avatarLocalPath){
        throw new ApiError(404,"avatar file is required")
    }

    //step 5:-
    const avatar =await  uploadOnCloudnary(avatarLocalPath)
    const coverImage =await  uploadOnCloudnary(coverImageLocalPath )
    if(!avatar){
        throw new ApiError(404,"avatar not found");
    }

    //step 6 :-
    const user = await User.create({
        fullname,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username : username.toLowerCase()
    })
    //step 7:-
    const searchUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )
    //step 8:-
    if(!searchUser){
        throw new ApiError(500,"somethin wrong in server")
    }

    return res.status(201).json(
        new ApiResponse(200,searchUser,"User created successfully.")
    );





})

export {registerUser}