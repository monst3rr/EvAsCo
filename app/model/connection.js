const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const CONNECTION=process.env.CONNECTION;

if(process.env.NODE_ENV == 'test'){
    CONNECTION=process.env.CONNECTION_TEST
}

const DB_NAME="messagedb"
const DB_COLLECTION="messages"
module.exports={
    connect:function(func,callback){
        MongoClient.connect(CONNECTION,{ useNewUrlParser: true },(err,client)=>{
            assert.equal(null, err);
            const db=client.db(DB_NAME)
            const collection=db.collection(DB_COLLECTION)
            func(collection,callback)
            client.close()
        })
    }
}