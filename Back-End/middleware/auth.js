const jwt = require('jsonwebtoken')

const verifiToken = (req,res,next)=>{
    const authHeader = req.headers['authorization']
   
    const token = authHeader && authHeader.split(' ')[1]
    

    if(!token){
        return res.status(401).json({success : false ,message : 'Accsess token not found'})
    }

    try {
        const decoded = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
       
        req.userID = decoded.userID
       
        next()
    } catch (error) {
        console.log(error);
        return res.status(403).json({success : false ,message : 'u are hacker'})
    }

}


module.exports = verifiToken