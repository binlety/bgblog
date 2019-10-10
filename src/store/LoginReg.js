import {observable,action} from 'mobx'
import {message} from 'antd'
import axios from 'axios'
class Store {
 @observable redirect = null
 @observable loginRegMsg =''
 @action register = (params)=>{
    axios.post('/api/admin/register',params)
    .then(res=>{
        if(res.data.code==0){
          message.success('注册成功,请登录');
          this.redirect='/login'
        }else{
        message.error('用户名重复');
        }
    })
 }
 @action login = (params)=>{
     axios.post('/api/admin/login',params)
     .then(res=>{
        if(res.data.code){
          this.loginRegMsg=res.data.msg
        }else{
            localStorage.setItem("usermsg",res.data);
            this.redirect='/home'
        }
     })
 }
 @action publicSetMethod =(key,val)=>{
   this[key]=val
 }
}

const store = new Store()

export default store