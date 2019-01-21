const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../../app');

chai.use(chaiHttp);

let token;

describe('/api/movies tests', () => {           //testimizin ne testi olduğunu anlatıyoruz
        before((done) => {                      //testten önce için before kullanılır
                chai.request(server)
                    .post('/auhenticate')
                        .send({username:'oguz4', password:'123123'})
                        .end((err, res) => {
                                token=res.body.token;
                                console.log(token);
                                done();
                        });
        });

                describe('/GET movies', () =>{
                        it('it should GET all the movies', (done) => {
                                chai.request(server)                                    //servera istek
                                    .get('/api/movies')
                                    .set('x-access-token', token)
                                    .end((err,res) => {                                 //bu işlemlerden sonra
                                            res.should.have.status(404);                //status 404 olmalı
                                            res.body.should.be.a('array');         //dizi olmalı
                                    });
                        })
                });
});

