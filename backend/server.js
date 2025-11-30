const express=require('express')
const app=express()
const cors=require('cors')
const connection=require('./config/db')
require('dotenv').config()
app.use(cors({
    origin: 'https://yaalitask.netlify.app/', 
    credentials: true
}));
app.use(express.json())
const router=require('./routes/noterouter')
app.use('/note',router)
connection()
app.listen(process.env.PORT,()=>{
    console.log("server created")
})

