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

const asyncHandler = (requestHandler) =>{ //requestHandler is the just the name of function we could have wrote fn 
    (req,res,next) =>{
        Promise.resolve(requestHandler(req,res,next)).catch((err) => next(err))
    }
}


export {asyncHandler}