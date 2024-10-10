const express = require('express')
const mongoose = require('mongoose')
const  productRoute  = require('./routes/product.route')
const app = express()
const cors = require('cors')
const userRoute = require('./routes/user.route')
app.use(express.urlencoded({extended:true}))
app.use(express.json())
require('dotenv').config()

// all origin
app.use(cors())

// specific frontend 
// const corsOption = {
//     origin: ['htpp://localhost:5173'],
//     optionsSuccessStatus: 200
// }
//app.use(cors(corsOption))

const URI = process.env.DATABASE_URI

mongoose.connect(URI)
.then(() =>{
    console.log("Connected to MongoDB")
})
.catch((err) =>{
    console.log(err)
})



app.use('/product', productRoute)
app.use('/account', userRoute)

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