const express = require('express')
const mongoose = require('mongoose')
const  productRoute  = require('./routes/product.route')
const app = express()
app.use(express.urlencoded({extended:true}))
app.use(express.json())
require('dotenv').config()

const URI = process.env.DATABASE_URI

mongoose.connect(URI)
.then(() =>{
    console.log("Connected to MongoDB")
})
.catch((err) =>{
    console.log("Error connecting to MongoDB")
})



app.use('/product', productRoute)

app.get('/', (req, res) =>{
    res.send('Hello World')
})



const PORT = 5000
app.listen(PORT, (err) =>{
    if(!err){
        console.log('Server dey work');
    } else{
        console.log('Server no gree work');
    }
})