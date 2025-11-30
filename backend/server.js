const express=require('express')
const app=express()
const cors=require('cors')
const connection=require('./config/db')
require('dotenv').config()
app.use(cors())
app.use(express.json())
const router=require('./routes/noterouter')
app.use('/note',router)
connection()
app.listen(process.env.PORT,()=>{
    console.log("server created")
})

