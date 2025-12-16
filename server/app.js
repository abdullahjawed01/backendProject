import express from "express"
import dotenv from "dotenv"

dotenv.config()
const PORT = process.env.PORT
const app = express()
app.use(express.json())


// imports public
import "./utils/dbConnect.js"
import Restrauntsrouter from "./controllers/Public/IndexRestraunts.js"
import Customersrouter from "./controllers/Public/IndexCustomer.js"
import Ridersrouter from "./controllers/Public/IndexRiders.js"


// auth
// 
import middleware from "./auth/auth.js"
// imports private
import Customerprivate from "./controllers/private/customers/IndexCustomer.js"
import restaurantsprivate from "./controllers/private/restraunts/IndexRestraunts.js"
import ridersprivate from "./controllers/private/riders/IndexRiders.js"





// apis
app.get("/",(req,res)=>{
    try {
        res.status(200).json({msg:"This is my test api"})
    } catch (error) {
        console.log(error);
    res.status(500).json({msg:error})
    }
})



// routes
app.use("/users/customers",Customersrouter)
app.use("/users/Restraunts",Restrauntsrouter)
app.use("/users/riders",Ridersrouter)
app.use(middleware)
app.use("/private/customers",Customerprivate)
app.use("/private/restraunts",restaurantsprivate)
app.use("/private/riders",ridersprivate)





// listen and running
app.listen(PORT,()=>{
    console.log(`The server is up and running on http://localhost:${PORT}`);
})