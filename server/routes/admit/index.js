module.exports= app =>{
    const  express=require("express")
    const jwt=require('jsonwebtoken')
    const AdminUser=require("../../models/AdminUser")
    const assert=require('http-assert')

    const authMiddleWare=require('../../middleware/auth')
    const  resourceMiddleWare=require('../../middleware/resource')


    const router=express.Router({
      mergeParams:true
    })
    //创建资源
      router.post('/',async(req,res)=>{
         const  model=  await req.Model.create(req.body)   
         res.send(model)
      })
      //查找资源
      router.get('/',async(req,res)=>{
        let queryOptions={}
        if(req.Model.modelName==='Category'){
           queryOptions.populate='parent'
        }
        const items=await req.Model.find().setOptions(queryOptions).limit(100)
        res.send(items)
      }),
      //查找资源
      router.get('/:id',async(req,res)=>{
        const model=await req.Model.findById(req.params.id)
        console.log(model)
        res.send(model)
      }),
      //更新资源
      router.put('/:id',async(req,res)=>{
        const model=await req.Model.findByIdAndUpdate(req.params.id,req.body)
        res.send(model)
      }),
      router.delete('/:id',async(req,res)=>{
             await  req.Model.findByIdAndRemove(req.params.id,req.body)
           res.send({
               success:true
           })
      })
    app.use('/admit/api/rest/:resource',authMiddleWare(),resourceMiddleWare(),router)
    
    const multer=require('multer')
    const upload=multer({dest:__dirname+'/../../uploads'})
    app.post('/admit/api/upload',authMiddleWare(),upload.single('file'),async(req,res)=>{
               const file=req.file
               file.url=`http://localhost:3000/uploads/${file.filename}`
             res.send(file)
    })

    app.post('/admit/api/login',async(req,res)=>{
       const {username,password}=req.body
       //1.找用户，根据用户名找用户
        
          const user=await AdminUser.findOne({username}).select('+password')//条件用键值对表示
           assert(user,422,'用户不存在')
           //asset包，判断user是否存在，为false，错误码为422，后台抛出message，用户不存在
      //2.校验密码
          const isValid=require('bcryptjs').compareSync(password,user.password)
          assert(isValid,422,'密码错误')

      //3.返回一个token
      
      const token=jwt.sign({
        _id:user.id,
        username:user.name},
        app.get('secret')
           )
           res.send(token)
    }) 
    //捕获后台的错误，向前端页面发送消息
    app.use(async(err,req,res,next)=>{
      console.log(err)
      res.status(err.statusCode||500).send({
        message:err.message
      })
    })    
}

