const mongoose = require('mongoose')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const secret = require("../config/jwt")
const Schema = mongoose.Schema

const UsersSchema = new Schema({
    email: {
        type:String,
        required:true  
    },
    password:{
        type:String,
        required:true,
        min:6
    },
    fullname:String,
    token: String
})

UsersSchema.pre('save',function(next){
    const user = this

    if(!user.token){
    const salt = bcryptjs.genSaltSync(10)
    const hash = bcryptjs.hashSync(user.password,salt)

    user.password = hash
    }
    next()
})

UsersSchema.methods.comparePassword = function(password){
    const user = this 

    return bcryptjs.compareSync(password, user.password)
}

UsersSchema.methods.generateToken = function(){
    const user = this

    const token = jwt.sign({_id: user._id}, secret)
    console.log('token ==> ', token)
    return token
}

const Users = mongoose.model('users',UsersSchema)

module.exports = Users