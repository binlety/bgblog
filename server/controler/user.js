const express = require('express')
const Router = express.Router()
const model = require('../model')
const User = model.getModel('user')
Router.get('/list', function(req, res) {
    User.find({}, function(err, doc) {
            return res.json(doc)
        })
        // User.remove({},function(e,d){

    // })
})
Router.post('/register', function(req, res) {
    const { username, password } = req.body
    User.findOne({ username }, function(err, doc) {
        if (doc) {
            return res.json({ code: 1, msg: '用户名重复' })
        }
        User.create({ username, password }, function(e, d) {
            if (e) {
                return res.json({ code: 1, msg: "后端出错了" })
            }
            return res.json({ code: 0, data: { username, password } })
        })
    })

    // const userModel=new User({username,password})
    // userModel.save(function(e,d){
    //     if(e){
    //         return res.json({code:1,msg:"后端出错了"})
    //     }
    //     return res.json({code:0,data:{username,password}})
    // })
})

Router.post('/login', function(req, res) {
    const { username, password } = req.body
    User.findOne({ username, password }, function(err, doc) {
        if (!doc) {
            return res.json({ code: 1, msg: '用户名或密码错误' })
        }
        return res.json({ code: 0, data: doc })
    })
})
Router.get('/info', function(req, res) {
    return res.json({ code: 1 })
})

module.exports = Router