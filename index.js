import express from 'express'
import mongoose from "mongoose"
import userRouter from './router/userRouter.js'
import productRouter from './router/productRouter.js'
import jsonwebtoken from 'jsonwebtoken'
import authorizeUser from './library/jwtMiddleware.js'

const app = express()

app.use(express.json())

const mongoURI = "mongodb+srv://adminshan:IMA30n%40@cluster0.6yufxrf.mongodb.net/?appName=i-computers-backend"

mongoose.connect(mongoURI).then(
    ()=>{
        console.log("Connected to MongoDB")
    }
).catch(
    ()=>{
        console.log("Error connecting to MongoDB")
    }
)

app.use("/users",userRouter)
app.use(authorizeUser);
app.use("/products",productRouter)

function start(){
    console.log("Server started on port 5001")
}

app.listen(5001, start)