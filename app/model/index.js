const db=require('./connection.js')
var ObjectID = require('mongodb').ObjectID;
module.exports={
    getMessageById:function(id,callback){
        var message=function(collection,callback){
            collection.findOne({"_id":new ObjectID(id)},function(err,doc){
                callback(err,doc)
            })
        }
        db.connect(message,callback)
    },
    getMessages:function(callback){
        var message=function(collection,callback){
            collection.find({}).toArray(function(err,docs){
                callback(err,docs)
            })
        }
        db.connect(message,callback)
    },
    insertMessage:function(message,callback){
        var result=function(collection,callback){
            collection.insertOne(message,function(err,res){
                callback(err,res)
            })
        }
        db.connect(result,callback)
    },
    deleteMessaage:function(id,callback){
        var result=function(collection,callback){
            collection.deleteOne({"_id":new ObjectID(id)},function(err,res){
                callback(err,res)
            })
        }
        db.connect(result,callback)
    }
}