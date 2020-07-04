import axios from "axios"
import  Vue  from 'vue'
import router  from  './router'
 
 const http=axios.create({
     baseURL:"http://localhost:3000/admit/api"
 })
 http.interceptors.request.use(function(config){
     if(localStorage.token){
        config.headers.Authorization='Bearer '+localStorage.token;
     }
        return config
 },function(error){

 })

 http.interceptors.response.use(res=>{
       return res
 },err=>{
       if(err.response.data.message){
        Vue.prototype.$message({
            type:'error',
            message:err.response.data.message
        })
         if(err.response.status){
             router.push('/login')
         }
       }
      

       return Promise.reject(err)
 })

 export default http