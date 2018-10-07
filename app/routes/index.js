const express=require('express')
const router=express.Router()
const model=require('./../model/index.js')

const v1=require('./v1/index.js')
router.use('/v1',v1)

module.exports=router