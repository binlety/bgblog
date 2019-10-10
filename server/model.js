const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/binlety')

const schemas = {
    user: {
        'username': { type: String, require: true },
        'password': { type: String, require: true },
    },
    category: {
        'categoryName': { type: String, require: true },
        'categoryTags': { type: Array, require: true },
        'createTime': { type: String },
        'key': { type: String },
    }
}

for (let i in schemas) {
    console.log(schemas[i])
    mongoose.model(i, new mongoose.Schema(schemas[i]))
}

module.exports = {
    getModel: function(name) {
        return mongoose.model(name)
    }
}