const mongoose=require("mongoose")

const schema=new mongoose.Schema({
    parent:{type:mongoose.SchemaTypes.ObjectId,ref:"Category"},
    name:{type:String}
   
})
//schema的虚拟属性，相当于Vue中的计算属性，可以将schema中的已知属性计算
schema.virtual('children',{
    localField:'_id',
    foreignField:'parent',//关联Category中的parent
    justOne:false,//是否查询一条数据
    ref:'Category'//关联Category模型
}),
schema.virtual('newsList',{
    localField:'_id',
    foreignField:'categories',
    justOne:false,
    ref:"Article"
})
module.exports=mongoose.model('Category',schema)