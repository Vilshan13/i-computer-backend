import express from 'express'
import mongoose from "mongoose"
import userRouter from './router/userRouter.js'
import productRouter from './router/productRouter.js'
import jsonwebtoken from 'jsonwebtoken'
import authorizeUser from './library/jwtMiddleware.js'
import cors from 'cors' 
import { configDotenv } from 'dotenv'


const app = express()

app.use(cors())

app.use(express.json())

const mongoURI = process.env.MONGO_URI

mongoose.connect(mongoURI).then(
    ()=>{
        console.log("Connected to MongoDB")
    }
).catch(
    ()=>{
        console.log("Error connecting to MongoDB")
    }
)

app.use("/users",userRouter)//api
app.use(authorizeUser);
app.use("/products",productRouter)//api

function start(){
    console.log("Server started on port 5001")
}

app.listen(5001, start)