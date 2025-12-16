import express from "express"
import ridersModel from "../../../models/Riders/Riders.js"
import customerModel from "../../../models/Customers/Customers.js"
import restrauntModel from "../../../models/Restraunts/Restraunts.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


let router = express.Router()


// apis
router.get("/restaurants/:_id",async(req,res)=>{
    try {
        let check = req.params._id
        let final = await restrauntModel.findById({_id:check})
        res.status(200).json(final)
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:error})
    }
})


router.put("/updaterestaurants/:_id",async(req,res)=>{
    try {
        let check = req.params._id
        let update = req.body
        
        let final = await restrauntModel.updateOne({_id:check},{$set:update},{new:true})
        let user = await restrauntModel.findOne({_id:check})
        if(update.password){
            let hashpass = await bcrypt.hash(update.password,10)
        user.password = hashpass
        await user.save()
        res.status(200).json({msg:"user updated"})
        }
        res.status(200).json(final)
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:error})
    }
})


router.put("/deleterestaurants/:_id",async(req,res)=>{
    try {
        let check = req.params._id
        let final = await restrauntModel.deleteOne({_id:check})
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



router.get("/riderdetails",async(req,res)=>{
    try {
        let check = await ridersModel.find()
        res.status(200).json(check)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
})

export default router