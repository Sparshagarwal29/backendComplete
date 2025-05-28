// this (line 2 tp 13) is a try and catch way to function 
// const asyncHandler = (fn) => async(req,res,next) => {
//     try{
//         await fn(req,res,next)

//     }catch (error){
//         res.status(error.code || 500).json({
//             success: false,
//             message: error.message
//         })

//     }
// } 
// whats the need of this ? : with this i dont need to wrap try and catch block again and again 
const asyncHandler = (requestHandler) =>{ //requestHandler is the just the name of function we could have wrote fn 
    return (req,res,next) =>{
        Promise.resolve(requestHandler(req,res,next)).catch((err) => next(err))
    }
}


export {asyncHandler}