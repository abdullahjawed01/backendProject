import express from "express"
import ridersModel from "../../../models/Riders/Riders.js"
import customerModel from "../../../models/Customers/Customers.js"
import restrauntModel from "../../../models/Restraunts/Restraunts.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

let router = express.Router()


// apis
router.get("/riders/:_id",async(req,res)=>{
    try {
        let check = req.params._id
        let final = await ridersModel.findById({_id:check})
        res.status(200).json(final)
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:error})
    }
})


router.put("/updateriders/:_id",async(req,res)=>{
    try {
         let check = req.params._id
        let update = req.body
        
        let final = await ridersModel.updateOne({_id:check},{$set:update},{new:true})
        let user = await ridersModel.findOne({_id:check})
        if(update.password){
            let hashpass = await bcrypt.hash(update.password,10)
        user.password = hashpass
        await user.save()
        res.status(200).json("user updated")
        }
        res.status(200).json(final)
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:error})
    }
})


router.put("/deleteriders/:_id",async(req,res)=>{
    try {
        let check = req.params._id
        let final = await ridersModel.deleteOne({_id:check})
        res.status(200).json(final)
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:error})
    }
})


router.get("/getcustomer",async(req,res)=>{
    try {
        let check = await customerModel.find()
        res.status(200).json(check)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
})






export default router