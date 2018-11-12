import * as HTTPStatus from 'http-status'
import * as jwt from 'jwt-simple'
import {app, request, expect} from './config/helpers'
const model = require('../../models')
const config = require('../../config/env/config')()

describe('Teste de Integração', ()=>{

    'use strict'

    let id
    let token

    const userTest = {
        id: 100,
        name: 'User Teste',
        email: 'email@teste.com',
        password: '123456'
    }

    const userDefault = {
        id: 1,
        name: 'Vinicius',
        email: 'email@email.com',
        password: '123'
    }

    beforeEach((done) => {
        model.User.destroy({
          where: {}
        })
        .then(() => {
          return model.User.create(userDefault);
        })
        .then(user => {
          model.User.create(userTest)
            .then(() => {
                token = jwt.encode({id: user.id}, config.secret)
                done();
            })
        })
      });

    describe('POST /token', () => {
        it('Deve receber um JWT', done=>{
            const credentials = {
                email: userDefault.email,
                password: userDefault.password
            }
            request(app)
                .post('/token')
                .send(credentials)
                .end((error, res)=>{
                    expect(res.status).to.be.equal(HTTPStatus.OK)
                    expect(res.body.token).to.be.equal(`${token}`)
                    done(error)
                })
        })
        it('Não deve gerar um JWT', done=>{
            const credentials = {
                email: 'aa@aa.com',
                password: 'aaaa'
            }
            request(app)
                .post('/token')
                .send(credentials)
                .end((error, res)=>{
                    expect(res.status).to.be.equal(HTTPStatus.UNAUTHORIZED)
                    expect(res.body).to.empty
                    done(error)
                })
        })
    })

    describe('GET /api/users/all', ()=>{
        it('Deve retornar JSON com todos os usuários', done=>{
            request(app)
                .get('/api/users/all')
                .set('Content-Type', 'application/json')
                .set('Authorization', `JWT ${token}`)
                .end((error, res)=>{
                    expect(res.status).to.equal(HTTPStatus.OK)
                    expect(res.body.payload).to.be.an('array')
                    expect(res.body.payload[0].name).to.be.equal(userTest.name)
                    expect(res.body.payload[0].email).to.be.equal(userTest.email)
                    done(error)
                })
        })
    })
    describe('GET /api/users/:id', ()=>{
        it('Deve retornar JSON com um usuários', done=>{
            request(app)
                .get(`/api/users/${userDefault.id}`)
                .set('Content-Type', 'application/json')
                .set('Authorization', `JWT ${token}`)
                .end((error, res)=>{
                    expect(res.status).to.equal(HTTPStatus.OK)
                    done(error)
                })
        })
    })
    describe('POST /api/users/create', ()=>{
        it('Deve criar usuário', done=>{
            const user = {
                id: 2,
                name: 'Teste',
                email: 'aa@aa.com',
                password: 'asdf',
            }
            request(app)
                .post(`/api/users/create`)
                .set('Content-Type', 'application/json')
                .set('Authorization', `JWT ${token}`)
                .send(user)
                .end((error, res)=>{
                    expect(res.status).to.equal(HTTPStatus.OK)
                    expect(res.body.payload.id).to.eql(user.id)
                    expect(res.body.payload.name).to.eql(user.name)
                    done(error)
                })
        })
    })
    describe('PUT /api/users/:id/update', ()=>{
        it('Deve atualizar um usuário', done=>{
            const user = {
                name: 'TesteUpdate'
            }
            request(app)
                .put(`/api/users/${1}/update`)
                .set('Content-Type', 'application/json')
                .set('Authorization', `JWT ${token}`)
                .send(user)
                .end((error, res)=>{
                    expect(res.status).to.equal(HTTPStatus.OK)
                    done(error)
                })
        })
    })
    describe('DELETE /api/users/:id/destroy', ()=>{
        it('Deve deletar um usuários', done=>{
            request(app)
                .delete(`/api/users/${1}/destroy`)
                .set('Content-Type', 'application/json')
                .set('Authorization', `JWT ${token}`)
                .end((error, res)=>{
                    expect(res.status).to.equal(HTTPStatus.OK)
                    done(error)
                })
        })
    })
})