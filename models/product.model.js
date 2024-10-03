const mongoose = require ('mongoose')

const ProductSchema = mongoose.Schema({
    image: { type:String, require:true},
    title: { type:String, require:true },
    description: { type:String, require:true },
    price: { type:Number, require:true },
    quantity: { type:Number},
    date_created: { type: Date, default: Date.now }
})
const ProductModel = mongoose.model('product_collections', ProductSchema)

module.exports = {ProductModel}