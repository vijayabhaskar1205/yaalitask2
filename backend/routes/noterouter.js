const express=require('express')
const router=express.Router()
const control=require('../controller/noteappcontroller')

router.post('/notepost',control.notecreate)
router.get('/getall',control.getall)
router.get('/search',control.search)

module.exports=router