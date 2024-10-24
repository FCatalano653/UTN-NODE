import User from "../models/mongoDB/User.js";
import { hash, compare } from "bcrypt";
import jwt from 'jsonwebtoken';
const saltRounds = 10

export const authController = {

    async registerUser(req, res){
        try {
            
            const {fullName, email} = req.body
            const password = await hash(req.body.password, saltRounds) 
            const newUser = new User({fullName, email, password})

            const response = await newUser.save()
            
            res.status(200).json({
                succes:true,
                message:"New User registered",
                data: response
            
            })

        } catch (err) {
            res.status(500).json({
                succes:false,
                message:"Internal Server Error",
                data: err.message
            
            })
        }
        
    },

    async login(req, res){
        const response = await User.find().where({email: req.body.email})
        if(!response.length){
            return res.status(401).json({success: false, message: "Invalid Email or Password"})
        }

        const {password} = response[0]

        const isSamePassword = await compare(req.body.password, password)
        if(!isSamePassword){
            return res.status(401).json({success: false, message: "Invalid Email or Password"})
        }

        const userForToken = {
                    userName: response[0].fullName,
                    userEmail: response[0].email,
                    sub: response[0].id
                }

        const accesToken = jwt.sign(userForToken, process.env.JWT_SECRET, {expiresIn: '1h'})
        return res.status(200).json({success: true, message: "User Authenticated", data: accesToken})
    }

    // async generateToken(payload){
    //     const userForToken = {
    //         userName: payload.fullName,
    //         userEmail: payload.email,
    //         sub: payload.ID
    //     }

    //     return jwt.sign(userForToken, process.env.JWT_SECRET, {expiresIn: '1h'})
    // }

}