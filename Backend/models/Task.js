const mongoose = require('mongoose')


const TaskSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,'Please Provide A Title'],
        trim:true
    },
    completed:{
        type:Boolean,
        required:false,
        default:false
    },
    priority:{
        type:Number,
        required:[true,'Please Provide A Priority'],
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true 
    }
},{
    timestamps: true
})


const Task = mongoose.model("Task",TaskSchema)

module.exports = Task