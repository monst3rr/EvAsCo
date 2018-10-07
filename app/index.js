global.__basedir = __dirname;
const express = require('express')
const app = express()
var bodyParser=require('body-parser')
const port = 1337
const morgan=require('morgan')

var http = require('http').Server(app);
io = require('socket.io')(http);


const logger=require('./logger/logger.js')
app.use(morgan('dev'))

app.use(bodyParser.json())

const api=require('./routes/index')
app.use('/api',api)

app.use(express.static('view/dist'))

app.get('/', function (req, res, next) {
    res.sendfile('view/dist/index.html')
})

app.use((req,res,next)=>{
    res.status(404).json({error:'Not Found!'})
})

io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
});

http.listen(port, () => console.log(`Application listening on port ${port}!`))

module.exports=app