import { body,validationResult } from "express-validator";


const registerCustomer = [
    body("fullName").trim()
                .notEmpty().withMessage("Name is required")
                .isAlpha().withMessage("Name is required")
                .isLength({min:3,max:25}).withMessage("Minimun 3 and maximum is 25 character"),

    body("phone").trim()
                 .notEmpty().withMessage("Phone is required")
                 .isMobilePhone().withMessage("Type error in phone number"),
                 
    body("password").trim()
                    .isLength({min:6}).withMessage("Password must be atleast 6 character long")
                    .notEmpty().withMessage("Please enter your password"),

    body("email").trim()
                 .notEmpty().withMessage("Email is empty")
                 .isEmail().withMessage("Please Enter proper email"),

    body("address").trim()
                   .notEmpty().withMessage("Please Enter you address")
            
    
]


const loginCustomers = [
       body("email").trim()
                 .notEmpty().withMessage("Email is empty")
                 .isEmail().withMessage("Please Enter proper email"),

       body("password").trim()
                    .isLength({min:6}).withMessage("Password must be atleast 6 character long")
                    .notEmpty().withMessage("Please enter your password"),
        

]



const registerRestraunts = [
    body("restrauntName").trim()
                .notEmpty().withMessage("Name is required")
                .isAlpha().withMessage("Name is required")
                .isLength({min:3,max:25}).withMessage("Minimun 3 and maximum is 25 character"),

    body("phone").trim()
                 .notEmpty().withMessage("Phone is required")
                 .isMobilePhone().withMessage("Type error in phone number"),
                 
    body("password").trim()
                    .isLength({min:6}).withMessage("Password must be atleast 6 character long")
                    .notEmpty().withMessage("Please enter your password"),

    body("email").trim()
                 .notEmpty().withMessage("Email is empty")
                 .isEmail().withMessage("Please Enter proper email"),

    body("address").trim()
                   .notEmpty().withMessage("Please Enter you address"),

    body("menu").trim()
                   .notEmpty().withMessage("Please Enter you menu"),

    body("menu.itemName").trim()
                   .notEmpty().withMessage("Please Enter you menu Item name"),

    body("menu.itemPrice").trim()
                   .notEmpty().withMessage("Please Enter you menu Item price"),
    
    
]


const loginRestraunts = [
       body("email").trim()
                 .notEmpty().withMessage("Email is empty")
                 .isEmail().withMessage("Please Enter proper email"),

       body("password").trim()
                    .isLength({min:6}).withMessage("Password must be atleast 6 character long")
                    .notEmpty().withMessage("Please enter your password"),
        

]



const registerRiders = [
    body("RidersName").trim()
                .notEmpty().withMessage("Name is required")
                .isAlpha().withMessage("Name is required")
                .isLength({min:3,max:25}).withMessage("Minimun 3 and maximum is 25 character"),

    body("phone").trim()
                 .notEmpty().withMessage("Phone is required")
                 .isMobilePhone().withMessage("Type error in phone number"),
                 
    body("password").trim()
                    .isLength({min:6}).withMessage("Password must be atleast 6 character long")
                    .notEmpty().withMessage("Please enter your password"),

    body("email").trim()
                 .notEmpty().withMessage("Email is empty")
                 .isEmail().withMessage("Please Enter proper email"),

    body("vehicletype").trim()
                   .notEmpty().withMessage("Please Enter you vehicle Name"),
    
    body("licenseNumber").trim()
                   .notEmpty().withMessage("Please Enter you License Number"),
    
    
]


const loginRiders = [
       body("email").trim()
                 .notEmpty().withMessage("Email is empty")
                 .isEmail().withMessage("Please Enter proper email"),

       body("password").trim()
                    .isLength({min:6}).withMessage("Password must be atleast 6 character long")
                    .notEmpty().withMessage("Please enter your password"),
        

]





function errorvalidation(req,res,next){
    const errors = validationResult(req)

    if (!errors.isEmpty()){
        return res.status(400).json({
            errors: errors. array()
        })
    }
    next()
}

export {errorvalidation,registerCustomer,loginCustomers,registerRestraunts,loginRestraunts,registerRiders,loginRiders}