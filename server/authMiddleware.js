const jwt=require('jsonwebtoken');
const asyncHandler=require('express-async-handler');
const User=require('./models/user.js');

const protect=asyncHandler(async(req,res,next)=>{
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
    {
        try{
            const array=req.headers.authorization.split(" ");
            token=array[1];
            const decoded=jwt.verify(token,process.env.JWT_SECRET);
            req.user=await User.findById(decoded.id).select('-password');
            next(); 
        }
        catch(e){
            throw e;
        }
    }
    if(!token)
    {
        throw new Error();
    }
})

module.exports=protect;
