import { Request, Response } from 'express'
import * as HTTPStatus from 'http-status'
import * as _ from 'lodash'
import {onError} from '../../api/responses/errorHandler'
import {onSuccess} from '../../api/responses/successHandler'
import User from './service'
import { dbErrorHandler } from '../../config/dbErrorHandler';


class UserController {

    private UserService: User

    constructor(){
        this.UserService = new User()
    }

    getAll(req: Request, res: Response){
        this.UserService
            .getAll()
            .then(_.partial(onSuccess, res))
            .catch(_.partial(onError, res, 'Erro ao buscar todos os usuários'))
    }
    createUser(req: Request, res: Response){
        this.UserService
            .create(req.body)
            .then(_.partial(onSuccess, res))
            .catch(_.partial(dbErrorHandler, res))
            .catch(_.partial(onError, res, 'Erro ao inserir o usuário'))
    }
    getById(req: Request, res: Response){
        const userId = parseInt(req.params.id)
        this.UserService
            .getById(userId)
            .then(_.partial(onSuccess, res))
            .catch(_.partial(onError, res, 'Erro ao buscar o usuário'))
    }
    updateUser(req: Request, res: Response){
        const userId = parseInt(req.params.id)
        const props = req.body
        this.UserService
            .update(userId, props)
            .then(_.partial(onSuccess, res))
            .catch(_.partial(dbErrorHandler, res))
            .catch(_.partial(onError, res, 'Erro ao atulizar o usuário'))
    }
    deleteUser(req: Request, res: Response){
        const userId = parseInt(req.params.id)
        this.UserService
            .delete(userId)
            .then(_.partial(onSuccess, res))
            .catch(_.partial(dbErrorHandler, res))
            .catch(_.partial(onError, res, 'Erro ao deletar o usuário'))
    }
}

export default UserController