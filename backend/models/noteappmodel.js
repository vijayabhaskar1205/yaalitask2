const mongoose=require('mongoose')

const noteschema=mongoose.Schema({
    userId: { 
        type: Number 
       
    }, 
    title:{
        type:String,
        required:[true,'please add the title']
    },
    description: 
    { 
        type: String, 
        required: [true, 'Please add a description']
     },
   
}, { timestamps: true })

const notemodel=mongoose.model('noteapp',noteschema) 

module.exports= notemodel