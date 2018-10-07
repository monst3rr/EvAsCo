const model = require(__basedir + '/model/index.js');
const express=require('express')
const router=express.Router()





/**
 * @api {get} /api/v1/message Request all messages.
 * @apiVersion 1.0.0
 * @apiName GetAllMessages
 * @apiGroup Message
 *
 * @apiSuccess {Object[]} message       List of messages.
 * @apiSuccess {String}   message._id   Message ID.
 * @apiSuccess {String}   message.message Message string.
 * 
 */
router.get('/',(req,res)=>{
    var util=model.getMessages(function(err,docs){
        if(!err){
            res.status(200).json({messages:docs.reverse()})
        }else{
            res.status(400).json({error:'Internal server error.'})
        }
    })
})




/**
 * @api {get} /api/v1/message/:id Get a message with id.
 * @apiVersion 1.0.0
 * @apiName GetMessage
 * @apiGroup Message
 *
 * @apiParam {Number} id Message ID.
 *
 * @apiSuccess {String} _id Message ID.
 * @apiSuccess {String} message  Message string.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "_id": "5bb9fb7453acc1001187f10d",
 *       "message": "Oh who was it I saw, oh who?"
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
                res.status(200).json({message:doc})
            }else{
                res.status(404).json({error:'Not found'})
            }
        }else{
            res.status(400).json({error:'Internal server error.'})
        }
    })
})


/**
 * @api {post} /api/v1/message Post a message.
 * @apiVersion 1.0.0
 * @apiName PostMessage
 * @apiGroup Message
 *
 * @apiParam {String} message Message string.
 *
 * @apiSuccess {String} _id Message ID.
 * @apiSuccess {String} message  Message string.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "_id": "5bb9fb7453acc1001187f10d",
 *       "message": "Oh who was it I saw, oh who?"
 *     }
 *
 */
router.post('/',(req,res)=>{
    var message={}
    if(req.body){
        message=req.body
    }
    if(message['message']){
        var util=model.insertMessage(message,function(err,result){
            if(!err){
                io.emit('message', result.ops[0]);
                res.status(200).json(result.ops[0])
            }else{
                res.status(400).json({error:'Internal server error.'})
            }
        })
    }else{
        res.status(400).json({error:'Unspecified JSON format'})
    }
})



/**
 * @api {delete} /api/v1/message/:id Delete a message with id.
 * @apiVersion 1.0.0
 * @apiName DeleteMessage
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
router.delete('/:id',(req,res)=>{
    var id=req.params.id
    if(id.length!=24){
        res.status(404).json({error:'Not found'})
        return;
    }
    var util=model.deleteMessaage(id,function(err,doc){
        if(!err){
            io.emit('delete', id);
            if(doc.deletedCount==0){
                res.status(404).json({error:'Not found'})
            }else{
                res.status(200).json({status:true})
            }
        }else{
            res.status(400).json({error:'Internal server error.'})
        }
    })

})


module.exports=router