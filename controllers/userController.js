const userModel = require('../models/userModel')
const bcrypt = require('bcrypt')

// create user register user
exports.registerController = async (req,res) => {
    try{
        const {username,email,password} = req.body
        //validation
        if(!username || !email || !password){
            return res.status(400).send({
                success: false,
                message: 'Please fill all the field'
            })
        }
        //existing user
        const existingUser = await userModel.findOne({email})
        if(existingUser){
            return res.status(401).send({
                success: false,
                message: 'user already exist' 
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10)

        // save new user
        const user = new userModel({username,email,password: hashedPassword})
        await user.save()
        return res.status(201).send({
            success: true,
            message: 'New User Created',
            user
        })
    } catch(error){
        console.log(error)
        return res.status(500).send({
            message: 'Error in register callback',
            success: false,
            error
        })
    }
}

// get all users
exports.getAllUsers = async (req,res) => {
    try{
        const users = await userModel.find({})
        return res.status(200).send({
            userCount: users.length,
            message: 'All users data',
            success: true,
            users
        })
    } catch(error){
        console.log(error)
        return res.status(500).send({
            message: 'Error in Get All Users',
            success: false,
            error
        })
    }
}

//login
exports.loginController = async (req,res) => {
    try{
        const {email,password} = req.body
        //validation
        if(!email || !password){
            return res.status(401).send({
                success: false,
                message: 'Please Provide email or password'
            })
        }
        //user
        const user = await userModel.findOne({email})
        if(!user){
            return res.status(200).send({
                message: 'email is not registered',
                success: false
            })
        }
        //password
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(401).send({
                message: 'Invalid username or password',
                success: false
            })
        }
        return res.status(200).send({
            message: 'Login successfully',
            success: true,
            user
        })
    } catch(error){
        console.log(error)
        return res.status(500).send({
            message: 'Error in Login Callback',
            success: false,
            error
        })
    }
}