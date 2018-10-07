const model = require(__basedir + '/model/index.js');
const express=require('express')
const router=express.Router()



/**
 * @api {get} /api/v1/palindrome/:id Get palindrome property of message with id.
 * @apiVersion 1.0.0
 * @apiName PalindromeMessage
 * @apiGroup Message
 *
 * @apiParam {Number} id Message ID.
 *
 * @apiSuccess {Boolean} status true.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "status": true
 *     }
 *
 * @apiError NotFound The id of the User was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "Not Found"
 *     }
 */
router.get('/:id',async (req,res)=>{
    var id=req.params.id
    if(id.length!=24){
        res.status(404).json({error:'Not found'})
        return;
    }
    var util=model.getMessageById(id,function(err,doc){
        if(!err){
            if(doc!=null){
                var re = /[\W_]/g;
                var msg=doc['message'].replace(/[^A-Z0-9]/ig, "").toLowerCase()
                var rev=msg.split('').reverse().join('');
                var status={status:false}
                if(msg==rev){
                    status={status:true}
                }
                res.status(200).json(status)
            }else{
                res.status(404).json({error:'Not found'})
            }
        }else{
            res.status(400).json({error:'Internal server error.'})
        }
    })
})

module.exports=router