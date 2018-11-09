import {testDouble, expect} from './config/helpers'
import User from '../../modules/User/service'

describe('Teste Unitarios do Controller', ()=>{
    describe('Metodo Create', ()=>{
        it('Deve criar novo usuário', ()=>{
            const novoUsuario = {
                id: 1, 
                name: 'Teste',
                email: 'teste@teste.com',
                password: 'asdf'
            }
            const user = new User();
            return user.create(novoUsuario).then(data => {
                expect(data.dataValues).to.have.all.keys(['email','id','name','password','updatedAt','createdAt'])
            })
        })
    })
    describe('Metodo Update', ()=>{
        it('Deve atualizar o usuário', ()=>{
            const usuarioAtt = {
                name: 'Testeaaa',
                email: 'teaaaste@teste.com'
            }
            const user = new User()
            return user.update(1, usuarioAtt).then(data=>{
                expect(data).to.be.an('array')
                expect(data[0]).to.be.equal(1)
            }) 
        })
    })
    describe('Metodo GET', ()=>{
        it('Deve retornar uma lista de usuários', ()=>{
            const user = new User()
            return user.getAll().then(data =>{
                expect(data).to.be.an('array')
                expect(data[0]).to.have.all.keys(['email','id','name','password'])
            })
        })
    })
    describe('Metodo GET by Id', ()=>{
        it('Deve retornar um usuário específico', ()=>{
            const user = new User()
            return user.getById(1).then(data =>{
                expect(data).to.have.all.keys(['email','id','name','password'])
            })
        })
    })
    describe('Metodo GET by Email', ()=>{
        it('Deve retornar um usuário específico', ()=>{
            const user = new User()
            return user.getByEmail('teaaaste@teste.com').then(data =>{
                expect(data).to.have.all.keys(['email','id','name','password'])
            })
        })
    })
    describe('Metodo Delete', ()=>{
        it('Deve apagar o usuário', ()=>{
            const user = new User()
            return user.delete(1).then(data =>{
                expect(data).to.be.equal(1)
            })
        })
    })
})