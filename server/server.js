const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const userRouter = require("./controler/user.js")
const categoryRouter = require("./controler/category.js")

const app = express()
app.use(cookieParser())
app.use(bodyParser.json())
app.use('/admin', userRouter)
app.use('/category', categoryRouter)


app.listen(9093, function() {
    console.log('we are connect')
})