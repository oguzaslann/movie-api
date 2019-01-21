const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../../app');

chai.use(chaiHttp);

describe('Node Server', () => {           //testimizin ne testi olduğunu anlatıyoruz
    it('(GET /) returns to homepage', (done) => {       //describeler içinde birden fazla it olabilir
       chai.request(server)
           .get('./')
           .end((err, res) => {
           res.should.have.status(404);
           done();                          //testten geçtiyse devam et
        })
    });
});