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
        restrauntName: "Niloufer",
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

router.post("/placeOrder", async (req, res) => {
  try {
    let order = req.body.restrauntName;
    let customerOrder1 = req.body.customerOrder;
    let check = await restrauntModel.findOne({ restrauntName: order });
    let user = await customerModel.findOne({
      email: "abdullahjawed2021@gmail.com",
    });
    let rider = await ridersModel.findOne({ RidersName: "Mike Rider" });
    check.customerOrder.push(customerOrder1);
    rider.currentOrder.push(customerOrder1);
    user.currentOrder.push(customerOrder1);
    await rider.save();
    await user.save();
    await check.save();
    res.status(200).json({ msg: "Order done succefully" });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.get("/riderdetails", async (req, res) => {
  try {
    let check = await ridersModel.find();
    res.status(200).json(check);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.get("/currentOrder", async (req, res) => {
  try {
    let order = await restrauntModel.findOne({ restrauntName: "Niloufer" });
    let menu = order.customerOrder;
    res.status(200).json(menu);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.post("/orderComplete", async (req, res) => {
  try {
    let user = await customerModel.findOne({
      email: "abdullahjawed2021@gmail.com",
    });
    let restraunt = await restrauntModel.findOne({ restrauntName: "Niloufer" });
    let rider = await ridersModel.findOne({ RidersName: "Mike Rider" });

    user.orderHistory.push(user.currentOrder);
    user.currentOrder = [];

    restraunt.orderHistory.push(restraunt.customerOrder);
    restraunt.customerOrder = [];

    rider.orderHistory.push(rider.currentOrder);
    rider.currentOrder = [];

    await user.save();
    await restraunt.save();
    await rider.save();

    res.status(200).json("The order is completed thanks!");
  } catch (error) {
    console.log(error);
  }
});

export default router;
