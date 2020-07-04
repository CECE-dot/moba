module.exports=()=>{
    const jwt=require('jsonwebtoken')
    const AdminUser=require("../models/AdminUser")
    const assert=require('http-assert')
    return async(req,res,next)=>{
        //校验用户是否登入
        const token=String(req.headers.authorization || '' ).split(' ').pop()
        assert(token,401,'请先登入')
        const tokenData =jwt.verify(token ,req.app.get('secret'))
        assert(tokenData._id,401,'请先登入')
        req.user=await AdminUser.findById(tokenData._id)
        assert(req.user,401,'请先登入')
        await next()
      }
}