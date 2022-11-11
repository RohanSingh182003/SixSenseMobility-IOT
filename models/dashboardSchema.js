const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    prod_name :{
        type: String,
        required : true
    },
    ip_address :{
        type: String,
        require: true
    },
    mac_address :{
        type: String,
        require: true,
        unique : true
    },
    function :{
        type: String,
        require: true
    },
    version :{
        type: Number,
        require: true
    },
    last_updated :{
        type: Date,
        require: true
    }
})

const Product = new mongoose.model('Dashboard',ProductSchema)

module.exports = Product;