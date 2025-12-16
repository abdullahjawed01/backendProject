import mongoose from 'mongoose';


let ridersSchema = new mongoose.Schema({
    RidersName:{
        type:String,
        require:true,
        trim:true
    },
    phone:{
        type:String,
        unique:true,
        trim:true,
        require:true
    },
    email:{
        type:String,
        unique:true,
        trim:true,
        require:true
    },
    password:{
        type:String,
        require:true,
        trim:true
    },
    isVerified:{
        email:{
            type:Boolean,
            default:false
        },
        phone:{
            type:Boolean,
            default:false
         }
    },
    isVerifiedToken:{
        emailToken:{
            type:String,
            default:null
        },
        phoneToken:{
            type:String,
            default:null
        }
    },
    vehicleType:{
        type:String,
        require:true
    },
    licenseNumber:{
        type:String,
        require:true
    },
    currentOrder:{
        type:Array,
        default:null,
    },
    orderHisory:{
        type:Array,
        default:null
    }
},{timestamps:true})


let ridersModel = mongoose.model("Riders",ridersSchema)

export default ridersModel