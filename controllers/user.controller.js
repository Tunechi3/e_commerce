const express = require('express')
const { UserModel } = require('../models/user.model')
const nodemailer = require('nodemailer')


const registerUser = (req, res) =>{
    const {fullname, email, password} = req.body
    const user = new UserModel({
        fullname,
        email,
        password
    })
    user.save()
    .then((data) =>{
        // send email
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth:{
                user: process.env.APP_EMAIL,
                pass: process.env.PASS
            }
        })

        const mailOptions = {
            from: process.env.APP_EMAIL,
            to: data.email,
            subject: 'Welcome to our website',
            text: `Hello ${data.fullname}, welcome to our website. Your account has been created`
        }
        transporter.sendMail(mailOptions, (error, info) =>{
            if (error) {
                console.log('Could not send email');                
            } else{
                console.log('Email sent:' + info.response);   
            }
        })
        res.send({status:true, data})
    })
    .catch((err) =>{
        res.send({status:false, message: "unable to save"})
    })
}


const loginUser = (req, res) =>{
    const {email, password} = req.body
    UserModel.findOne({email})
    .then((data)=>{
        if (data){
            data.validatePassword(password, (err, isMatch)=>{
                if(isMatch){
                    res.send({status:true, message: data})
                }
                else{
                    res.send({status:false, message: 'Invalid Password'})
                }
            })
        }
        else{
            res.send({status:false, message: 'Email not found'})
        }
    })
    .catch((err)=>{
        res.send({status:false, message: `error occured: ${err.message}`})
    })
}

module.exports = {registerUser, loginUser}