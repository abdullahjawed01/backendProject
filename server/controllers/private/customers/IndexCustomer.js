import express from "express";
import ridersModel from "../../../models/Riders/Riders.js";
import customerModel from "../../../models/Customers/Customers.js";
import restrauntModel from "../../../models/Restraunts/Restraunts.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

let router = express.Router();

// apis
router.get("/getcustomer/:_id", async (req, res) => {
  try {
    let check = req.params._id;
    let final = await customerModel.findOne({ _id: check });
    res.status(200).json(final);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
});

router.put("/updatecustomers/:_id", async (req, res) => {
  try {
    let check = req.params._id;
    let update = req.body;

    let final = await customerModel.updateOne(
      { _id: check },
      { $set: update },
      { new: true }
    );
    let user = await customerModel.findOne({ _id: check });
    if (update.password) {
      let hashpass = await bcrypt.hash(update.password, 10);
      user.password = hashpass;
      await user.save();
      res.status(200).json("user updated");
    }
    res.status(200).json(final);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
});

router.put("/deletecustomers/:_id", async (req, res) => {
  try {
    let check = req.params._id;
    let final = await customerModel.deleteOne({ _id: check });
    res.status(200).json(final);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
});

router.get("/view-menu", async (req, res) => {
  try {
    let viewmenu = await restrauntModel.find(
      {
        restrauntName:"Niloufer",
      },
      {
        menu: {
          itemName: 1,
          itemPrice: 1,
        },
      }
    );

    res.status(200).json(viewmenu);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});



router.post("/placeOrder",async(req,res)=>{
    try {
        let order = req.body.restrauntName 
        let customerOrder = req.body.customerOrder
        let check = await restrauntModel.findOne({restrauntName:order})
        check.customerOrder = customerOrder
        check.save()
        res.status(200).json({msg:"Order done succefully"})



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




export default router;
