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
    menu:[
        {itemName:{
            type:String,
            require:true,
            default:null
        },
        itemPrice:{
            type:String,
            require:true,
            default:null
        }}
    ],
    address:{
        type:String,
        require:true,
        trim:true
    },
    orderHistory:{
        type:Array,
        default:null
    },
    customerOrder:{
        type:Array,
        default:null
    }
},{timestamps:true})


let restrauntModel = mongoose.model("Restraunt",RestrauntSchema)

export default restrauntModel