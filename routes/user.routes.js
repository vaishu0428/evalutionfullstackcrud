const express=require("express")
const userRouter=express.Router()
const {UserModel}=require("../module/User.module")
const bcrypt=require("bcrypt")
const jwt=require('jsonwebtoken')
userRouter.post("/register",async(req,res)=>
{
    const {name,email ,gender ,password ,age ,city}=req.body
    try{
     bcrypt.hash(password,4,async(err,hash)=>
     {
        if(err)
        {
            res.send({'msg':'Something went to wrong'})
        }
        else{
            const user=new UserModel({name,email ,gender ,password:hash ,age ,city})
            await user.save()
            res.send({'msg':'User get register'})
        }
     })
    }
    catch(err)
    {
        res.send("Something went to wrong")
    }

})

userRouter.post("/login",async(req,res)=>
{
    const {email,password}=req.body
    try{
      const user=await UserModel.find({email})
      if(user.length>0)
      {
        bcrypt.compare(password,user[0].password,(err,result)=>
        {
            if(result)
            {
              let token=jwt.sign({userID:user[0]._id},'masai')
              res.send({'msg':'logged in','token':token})
            }
            else
            {
                res.send('Something went to wrong')
            }
        })
       
      }
      else{
        res.send("User is not logged in")
      }
      
    }
    catch(err)
    {
        res.send("Something went to wrong")
    }
})
module.exports={userRouter}