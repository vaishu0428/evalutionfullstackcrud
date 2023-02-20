const express=require("express")
const app=express()
require("dotenv").config()
const {connection}=require("./db")
const {userRouter}=require("./routes/user.routes")
const {postRouter}=require("./routes/post.routes")
const {authenticate}=require("./Middleware/authenticate.middleware")
const cors=require('cors')
app.use(express.json())
app.use(cors())
app.get("/",(req,res)=>
{
    res.send("Welcome to LinkedIn")
})
app.use("/users",userRouter)
app.use(authenticate)
app.use("/posts",postRouter)
app.listen(process.env.port,async()=>
{
    try{
       await connection
      console.log("Connected to db")
    }
    catch(err)
    {
        console.log("Not connected to db")
    }
    console.log("Server is running on port 8080")
})