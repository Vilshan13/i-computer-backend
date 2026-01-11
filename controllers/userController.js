import User from "../models/user.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export function createUser(req,res){

    const hashedPassword = bcrypt.hashSync(req.body.password,10)

    const user = new User(
        {
            email : req.body.email,
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            password:hashedPassword,
        }
    )

    user.save().then(
        ()=>{
            res.json({
                message : "User Created successfully!"
            })
        }
    ).catch(
        ()=>{
            res.Status(404).json({
                message:"User creation Failed!"
            })
        }
    )

}
export function loginUser(req,res){
    User.findOne({
        email : req.body.email
    }).then(
        (User)=>{
            if(User == null){
                res.Status(404).json({
                    message : "User with given Email not Found!"
                })
            }
            else{
                const isPasswordValid = bcrypt.compareSync(req.body.password,user.password)
                
                if(isPasswordValid){

                    //check if attemps are more than 3 times so, we do not send this token

                    const token = jwt.sign({
                        email :  User.email,
                        firstName : User.firstName,
                        lastName : User.lastName,
                        role : User.role,
                        Image : User.image,
                        isEmailVerified : User.isEmailverified
                    },process.env.JWT_SECRET)

                    console.log(token)

                    

                    res.json({
                        message : "Login Successfully",
                        token:token,
                        role : user.role,
                    })
                }else{
                    res.Status(404).json({
                        message : "Invalid Password"
                        //we should record in data base of this failed attempt for the specific email
                    })
                }

            }
        }
    ).catch(
        res.Status(500).res.json(
            {
                message : "Internal Server Error"
            }
        )
    )
}


export function isAdmin(req){
    if(req.user == nul){
        return false
    }
    if(req.user.role == "admin"){
        return true
    }else{
        return false
    }
}