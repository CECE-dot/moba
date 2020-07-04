const express=require("express")
 
const app=express()

app.set('secret','sdghsfddghsfdffg')

app.use(require('cors')())
app.use(express.json())
app.use('/uploads',express.static(__dirname+'/uploads'))


require("./plugins/db")(app)
require("./routes/admit/index")(app)
require('./routes/web/index')(app)


app.listen(3000,()=>{
    console.log("连接成功")
    console.log('http://localhost:3000')
})

