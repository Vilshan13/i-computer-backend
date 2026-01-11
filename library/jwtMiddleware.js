import jwt from "jsonwebtoken"
import { configDotenv } from "dotenv"
export default function authorizeUser(req,res, next ){
        
        const header = req.header("Authorization")
        
        if(header != null){
            const token = header.replace("Bearer ","")
            console.log(token)

            Jwt.Verify(token,process.env.JWT_SECRET,
                (err,decoded)=>{

                    if(decoded == null){
                        res.Status(401).json({
                            message : "Invalid token Please Login Again"
                        })
                    }else{
                        req.user = decoded
                        next()
                    }
                }
            )
        }else{
            next()
        }

    }