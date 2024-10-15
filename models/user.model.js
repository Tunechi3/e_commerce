const mongoose = require ('mongoose')
const bcrypt = require('bcryptjs')

const UserSchema = mongoose.Schema({
    fullname: { type:String, require:true},
    email: { type:String, require:true, unique: true },
    password: { type:String, require:true },
    date_created: { type: Date, default: Date.now }
})

let saltRound = 10
UserSchema.pre('save', function (next){
    bcrypt.hash(this.password, saltRound, (err, hashedPassword) =>{
        console.log(this.password, hashedPassword);
        if (err) {
            console.log('password could not be saved');
        } else {
            this.password = hashedPassword
            next()
        }
    })
})

UserSchema.methods.validatePassword = function (password, callback) {
    bcrypt.compare(password, this.password, (err, isMatch)=>{
        if(!err) {
            callback(err, isMatch)
        }
        else{
            console.log('Password could not be compared');
            next()
        }
    })
}


const UserModel = mongoose.model('user_collections', UserSchema)

module.exports = { UserModel }