import { Request, Response } from 'express'
import * as _ from 'lodash'
import Handlers from '../../api/responses/handlers'
import Post from './service'


class PostController {

    getAll(req: Request, res: Response){
        Post
            .getAll()
            .then(_.partial(Handlers.onSuccess, res))
            .catch(_.partial(Handlers.onError, res, 'Erro ao buscar todos os posts'))
    }
    createPost(req: Request, res: Response){
        Post
            .create(req.body)
            .then(_.partial(Handlers.onSuccess, res))
            .catch(_.partial(Handlers.dbErrorHandler, res))
            .catch(_.partial(Handlers.onError, res, 'Erro ao inserir o post'))
    }
    getById(req: Request, res: Response){
        const postId = parseInt(req.params.id)
        Post
            .getById(postId)
            .then(_.partial(Handlers.onSuccess, res))
            .catch(_.partial(Handlers.onError, res, 'Erro ao buscar o post'))
    }
    updatePost(req: Request, res: Response){
        const postId = parseInt(req.params.id)
        const props = req.body
        Post
            .update(postId, props)
            .then(_.partial(Handlers.onSuccess, res))
            .catch(_.partial(Handlers.dbErrorHandler, res))
            .catch(_.partial(Handlers.onError, res, 'Erro ao atulizar o post'))
    }
    deletePost(req: Request, res: Response){
        const postId = parseInt(req.params.id)
        Post
            .delete(postId)
            .then(_.partial(Handlers.onSuccess, res))
            .catch(_.partial(Handlers.dbErrorHandler, res))
            .catch(_.partial(Handlers.onError, res, 'Erro ao deletar o post'))
    }
}

export default new PostController()