const express=require("express")
const postRouter=express.Router()
const {PostModel}=require("../module/Post.model")
postRouter.post("/create",async(req,res)=>
{
    try{
        const post=new PostModel(req.body)
        await post.save()
        res.send("Post is created")
    }
    catch(err)
    {
        res.send("Something went to wrong")
    }
})
postRouter.get("/",async(req,res)=>
{
    let query=req.query
    try{
        const post=await PostModel.find(query)
        res.send(post)
    }
    catch(err)
    {
        res.send("Something went to wrong")
    }
})
postRouter.get("/top",async(req,res)=>
{
    
    try{
        const post=await PostModel.find({$no_if_comments:{$max}})
        res.send(post)
    }
    catch(err)
    {
        res.send("Something went to wrong")
    }
})
postRouter.patch("/update/:id",async(req,res)=>
{
    const postID=req.params.id
    const payload=req.body
    try{
        await PostModel.findByIdAndUpdate({_id:postID},payload)
        res.send("document get updated")
    }
    catch(err)
    {
        res.send("Document is not updated")
    }
})
postRouter.delete("/delete/:id",async(req,res)=>
{
    const postID=req.params.id
   
    try{
        await PostModel.findByIdAndDelete({_id:postID})
        res.send("document get deleted")
    }
    catch(err)
    {
        res.send("Document is not deleted")
    }
})
module.exports={postRouter}