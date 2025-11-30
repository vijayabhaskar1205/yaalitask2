const mongoose=require('mongoose')

const connection=async()=>{
       try{
    await mongoose.connect(process.env.MONGO)
    console.log("db connected")
       }
       catch(err)
       {
        console.log('dberror '+err.message)
       }
}

module.exports=connection