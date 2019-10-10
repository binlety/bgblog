const express = require('express')
const Router = express.Router()
const model = require('../model')
const Category = model.getModel('category')
Router.get('/list', function(req, res) {
    Category.find({}, function(err, doc) {
            return res.json({ code: 0, doc })
        })
        // Category.remove({}, function(e, d) {

    // })
})
Router.post('/add', function(req, res) {
    console.log(req.body)
    const params = {
        categoryName: req.body.fieldA,
        categoryTags: req.body.fieldB,
        createTime: new Date().toLocaleString(),
        key: new Date().toLocaleString()
    }
    Category.create(params, function(err, doc) {
        if (err) {
            return res.json({ code: 1, msg: '后端出错了' })
        } else {
            return res.json({ code: 0 })
        }
    })

})

Router.post('/del', function(req, res) {
    console.log(req.body)
    Category.remove({ _id: req.body._id }, function(err, doc) {
        if (!err) {
            return res.json({ code: 0 })
        }
    })
})


module.exports = Router