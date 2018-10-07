const express=require('express')
const router=express.Router()

const message=require('./message/index.js')
router.use('/message',message)

const palindrome=require('./palindrome/index.js')
router.use('/palindrome',palindrome)

module.exports=router