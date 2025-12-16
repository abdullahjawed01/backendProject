import express from "express";
import customerModel from "../../models/Customers/Customers.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sendEmail from "../../utils/sendEmail.js";
import sendSMS from "../../utils/sendSMS.js";

/////

const router = express.Router();
///////

///// apis
router.post("/register", async (req, res) => {
  try {
    let { fullName, email, phone, password, address } =req.body;

    // duplicate user 
    let duplicate = await customerModel.findOne({email})
    if(duplicate){
        return res.status(401).json({msg:"The user already exist"})
    }

    // hash password
    let hashpass = await bcrypt.hash(password,10)
    
    // email token 
    let emailToken = Math.random().toString(36).slice(2, 10);
    let phoneToken = Math.random().toString(36).slice(2, 10);

    let customer = {
        fullName,
        phone,
        email,
        password:hashpass,
        address,
        isVerifiedToken:{
            emailToken,
            phoneToken,
        }
    }

        await customerModel.create(customer)
    // send email 
    let emailUrl = `http://localhost:8080/users/email-verify/${emailToken}`;
    let phoneUrl = `http://localhost:8080/users/phone-verify/${phoneToken}`;
    console.log(emailUrl);
    console.log(phoneUrl);
    await sendEmail(email,"Please verify the link ",`Please go through the link${emailToken} `)
    // await sendSMS(phone,`Please verify the phone provide ${phoneToken}`)
    
    res.status(200).json(customer,"registered succesfully")


  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});


router.get("/email-verify/:emailToken", async (req, res) => {
  try {
    let emailToken = req.params.emailToken;

    if (!emailToken) {
      return res.status(400).json({ msg: "Email not found" });
    }

    let user = await customerModel.findOne({
      "isVerifiedToken.emailToken": emailToken,
    });

    user.isVerified.email = true;
    user.isVerifiedToken.emailToken = null;

    await user.save(); // final update
    res.status(200).json({ msg: "Email verified" });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});


router.get("/phone-verify/:phoneToken", async (req, res) => {
  try {
    let phoneToken = req.params.phoneToken;

    if (!phoneToken) {
      return res.status(400).json({ msg: "phone not found" });
    }

    let user = await customerModel.findOne({
      "isVerifiedToken.phoneToken": phoneToken,
    });

    user.isVerified.phone = true;
    user.isVerifiedToken.phoneToken = null;

    await user.save(); // final update
    res.status(200).json({ msg: "phone verified" });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.post("/login",async(req,res)=>{
    try {
        let {email,password} = req.body 
        let check = await customerModel.findOne({email})
        if(!check){
            return res.status(401).json("user not found")
        }
        
        let user = await customerModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "register " });
    }

    if (!user.isVerified.email && !user.isVerified.phone) {
      return res.status(400).json({ msg: "please verify your account" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid Creds " });
    }

    let payload = {
      id: user._id,
      email,
    };

    const token = jwt.sign(payload, "abdullah", { expiresIn: "1D" });
    res.status(200).json({ msg: "Login success", token: token });





    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
})




router.post("/forgetpass",async(req,res)=>{
  try {

    let email = req.body.email
    let one = await customerModel.findOne({email})
    if(!one){
      return res.status(401).json("The user doesn't exist")
    }
    sendEmail(email,"Please go through the email","Please enter your new password")


    let payload = {
      id: one._id,
      email,
    };

    const token = jwt.sign(payload, "abdullah", { expiresIn: "1D" });

    res.status(200).json(token)

  } catch (error) {
    console.log(error);
    res.status(500).json({msg:error})
  }
})








export default router