const jwt=require("jsonwebtoken")

const generateToken=(userData)=> {
    //in this function we are creating a new fresh jwt token to provide userfor login session management or for authorization purpose
    return jwt.sign(userData, process.env.PRIVATE_KEY)
}


const validateToken=(req,res,next)=>{
    //first we are checking that jwt token is available or not

    
    const authorization=req.headers.authorization

    if(!authorization){
        return res.status(401).json({err:'token not available'})
    }
    
    //we are storing the token value from headers and splitting to get "Bearer xyz.abc" to "xyz.abc"
    const token=req.headers.authorization.split(' ')[1]

    //token provided is wrong , throw error
    if(!token){
        return res.status(401,json({err:'Unauthorized User'}))
    }

    try {

        //we are handling if token is validated or verified then move to next middleware or respond back to client
        const validToken=jwt.verify(token,process.env.PRIVATE_KEY);
        
        req.user=validToken
        next()
    } catch (error) {
        console.error()
        return res.status(401).json({err: "Invalid Token"})
    }
}
module.exports = { generateToken, validateToken };