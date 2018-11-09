import * as HTTPStatus from 'http-status'
import {app, request, expect} from './config/helpers'
const model = require('../../models')

describe('Teste de Integração', ()=>{

    'use strict'
    const config = require('../../config/env/config')

    let id

    const userTest = {
        id: 100,
        name: 'User Teste',
        email: 'email@teste.com',
        password: '123456'
    }

    const userDefault = {
        id: 101,
        name: 'User Default',
        email: 'email@default.com',
        password: '654321'
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
              done();
            })
        })
      });

    describe('GET /api/users/all', ()=>{
        it('Deve retornar JSON com todos os usuários', done=>{
            request(app)
                .get('/api/users/all')
                .end((error, res)=>{
                    expect(res.status).to.equal(HTTPStatus.OK)
                    expect(res.body.payload).to.be.an('array')
                    expect(res.body.payload[0].name).to.be.equal(userDefault.name)
                    expect(res.body.payload[0].email).to.be.equal(userDefault.email)
                    done(error)
                })
        })
    })
    describe('GET /api/users/:id', ()=>{
        it('Deve retornar JSON com um usuários', done=>{
            request(app)
                .get(`/api/users/${userDefault.id}`)
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
                .end((error, res)=>{
                    expect(res.status).to.equal(HTTPStatus.OK)
                    done(error)
                })
        })
    })
})