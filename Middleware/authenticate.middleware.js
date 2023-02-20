const jwt=require('jsonwebtoken')
const authenticate=(req,res,next)=>
{
    const token=req.headers.authorization
    if(token)
    {
        jwt.verify(token,'masai',(err,decoded)=>
        {
            if(decoded)
            {
                req.body.users=decoded.userID
                next()
            }
            else{
                res.send("plz login")
            }
        })
    }
    else{
        res.send("plz login")
    }
}
module.exports={authenticate}