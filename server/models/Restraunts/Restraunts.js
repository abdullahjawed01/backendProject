import mongoose from 'mongoose';


let RestrauntSchema = new mongoose.Schema({
    restrauntName:{
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
    menu:{
        type:Object,
        require:true
    }
    ,
    address:{
        type:String,
        require:true,
        trim:true
    },
    orderHistory:{
        type:Array,
        default:[]
    },
    customerOrder:{
        type:Array,
        default:[]
    }
},{timestamps:true})


let restrauntModel = mongoose.model("Restraunt",RestrauntSchema)

export default restrauntModel