import { Request, Response } from 'express'
import * as _ from 'lodash'
import Handlers from '../../api/responses/handlers'
import Author from './service'


class AuthorController {

    getAll(req: Request, res: Response){
        Author
            .getAll()
            .then(_.partial(Handlers.onSuccess, res))
            .catch(_.partial(Handlers.onError, res, 'Erro ao buscar todos os autores'))
    }
    createAuthor(req: Request, res: Response){
        Author
            .create(req.body)
            .then(_.partial(Handlers.onSuccess, res))
            .catch(_.partial(Handlers.dbErrorHandler, res))
            .catch(_.partial(Handlers.onError, res, 'Erro ao inserir o autor'))
    }
    getById(req: Request, res: Response){
        const authorId = parseInt(req.params.id)
        Author
            .getById(authorId)
            .then(_.partial(Handlers.onSuccess, res))
            .catch(_.partial(Handlers.onError, res, 'Erro ao buscar o autor'))
    }
    updateAuthor(req: Request, res: Response){
        const authorId = parseInt(req.params.id)
        const props = req.body
        Author
            .update(authorId, props)
            .then(_.partial(Handlers.onSuccess, res))
            .catch(_.partial(Handlers.dbErrorHandler, res))
            .catch(_.partial(Handlers.onError, res, 'Erro ao atulizar o autor'))
    }
    deleteAuthor(req: Request, res: Response){
        const authorId = parseInt(req.params.id)
        Author
            .delete(authorId)
            .then(_.partial(Handlers.onSuccess, res))
            .catch(_.partial(Handlers.dbErrorHandler, res))
            .catch(_.partial(Handlers.onError, res, 'Erro ao deletar o autor'))
    }
}

export default new AuthorController()