const express = require('express')
const router = express.Router()
const Users = require('../models/Users')
const verifyToken = require('../middleware/verifyToken')

router.get('/', verifyToken, async(req,res)=>{
    const user = await Users.find()

    res.send({
        message:'All users',
        data:user
    })
})

router.post('/register', async (req, res) => {
    try{
        const user = new Users(req.body)
        await user.save()
        
       res.send({
           message: 'User Registered Successfully'
       })  
    }catch(e){
        res.send({
            message:e
        })
    }
})

router.post('/login', async(req,res)=>{ 
    const { email, password } = req.body

    const user = await Users.findOne({email})

    if(!user){
        res.send({
            message : "User doesn't exist"
        })
        return
    }

    //Step no 2 ==> Compare Password

    const isPasswordCorrect = user.comparePassword(password)
    console.log('isPasswordCorret', isPasswordCorrect)

    if(!isPasswordCorrect){
        res.send({
            message: "Invalid Password"
        })
        return
    }
    
    //Step no 3 ==> Generate token
    //JWT:
    const token = user.generateToken()
    user.token = token
    await user.save()

    res.send({
        message: "Logged in successfully",
        token
    })
})

module.exports = router