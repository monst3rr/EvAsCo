process.env.NODE_ENV = 'test';

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index.js');
let should = chai.should();
let id='';

chai.use(chaiHttp);

describe('Testing',()=>{
    describe('/POST api/v1/message',()=>{
        it('it should post a message', (done) => {

          let message = {
              message: "Are we not drawn onward, we few, drawn onward to new era?",
          }

            chai.request(server)
                .post('/api/v1/message')
                .send(message)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    id=res.body._id
                done();
            });
        })
    })

    describe('/GET api/v1/message',()=>{
        it('it should GET all the messages', (done) => {
            chai.request(server)
                .get('/api/v1/message')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                done();
            });
        })
    })

    
    describe('/GET api/v1/message/:id',()=>{
        it('it should get a message with id', (done) => {
            chai.request(server)
                .get('/api/v1/message/'+id)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                done();
            });
        })
    })

    describe('/DELETE api/v1/message/:id',()=>{
        it('it should delete a message with id', (done) => {
            chai.request(server)
                .del('/api/v1/message/'+id)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                done();
            });
        })
    })
})
