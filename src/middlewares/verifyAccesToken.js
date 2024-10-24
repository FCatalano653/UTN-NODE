import jwt from "jsonwebtoken"

export const verifyAccesToken = (req, res, next) =>{

    const authHeader = req.headers.authorization
    
    if(authHeader){
        const token = authHeader.split(" ").pop()
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded)=>{
            if(err) return res.status(401).json({succes: false, message: "Invalid or expired acces token"})
            req.decoded = decoded
            next()
        })
    }else{
        res.status(401).json({succes: false, message: "No access token provided"})
    }
    
    
}