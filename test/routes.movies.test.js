process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const server = require('../src/server/index');
const knex = require('../src/server/db/connection')

describe('routes: movies', ()=> {
    beforeEach(() => {
        return knex.migrate.rollback()
        .then(() => {return knex.migrate.latest()})
        .then(() => { return knex.seed.run()})
    });

    afterEach(() => {
        return knex.migrate.rollback();
    })

    describe('GET /api/v1/movies', () => {
        it('should return all movies', (done) => {
            chai.request(server)
            .get('/api/v1/movies')
            .end((err, res) => {
                should.not.exist(err)
                res.status.should.equal(200)
                res.type.should.equal('application/json');
                res.body.status.should.eql('success');
                res.body.data.length.should.eql(3);
                res.body.data[0].should.include.keys('id', 'name', 'genre', 'rating', 'explicit');
                done();
            })
        })
    })

    describe('GET /api/v1/movies/:id', () => {
        it('should respond with a single movie', (done) => {
            chai.request(server)
            .get('/api/v1/movies/1')
            .end((err, res) => {
                should.not.exist(err);
                res.status.should.equal(200);
                res.type.should.equal('application/json');
                res.body.status.should.eql('success')
                res.body.data[0].should.include.keys('id', 'name', 'genre', 'rating', 'explicit')
                done();
            });

        });
        it('should throw an error if the movie does not exit', (done) => {
            chai.request(server)
            .get('/api/v1/movies/999')
            .end((err, res) => {
                should.exist(err)
                res.status.should.equal(404);
                res.type.should.equal('application/json');
                res.body.status.should.eql('error');
                res.body.message.should.eql('That movie does not exist.')
                done()
            })
        });

    })

    describe('POST /api/v1/movies', () => {
        it('should return the movie that was added', (done) => {
            chai.request(server)
            .post('/api/v1/movies')
            .send({
                name: 'Titanic',
                genre: 'Drama',
                rating: 8,
                explicit: true
            })
            .end((err, res) => {
                should.not.exist(err);
                // 201 created
                res.status.should.equal(201)
                res.type.should.equal('application/json')
                res.body.status.should.eql('success');
                res.body.data[0].should.include.keys('id', 'name', 'genre', 'explicit','rating');
                done();
            })
        })

        it('should throw error if the payload is malformed', (done) => {
            chai.request(server)
            .post('/api/v1/movies')
            .send({name: 'Titanic'})
            .end((err, res) => {
                should.exist(err)
                res.status.should.equal(400);
                res.type.should.equal('application/json')
                res.body.status.should.equal('error')
                should.exist(res.body.message)
                done()
            })
        })
    })
})