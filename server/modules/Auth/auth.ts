import {Request, Response} from 'express'
import * as _ from 'lodash'
import User from '../User/service'
import Handlers from '../../api/responses/handlers'
import Auth from '../../auth';
import { type } from 'os';

class TokenRoutes {
    constructor(){}

    auth(req: Request, res: Response){
        const credentials = {
            email: req.body.email,
            password: req.body.password,
            refreshToken: req.body.refreshToken
        }

        if((credentials.hasOwnProperty('email') && typeof credentials.email !=  "undefined")
         && (credentials.hasOwnProperty('password') && typeof credentials.password != "undefined")){
            User
                .getByEmail(credentials.email)
                .then(_.partial(Handlers.authSuccess, res, credentials))
                .catch(_.partial(Handlers.authFail, req, res))
        }else if(credentials.hasOwnProperty('refreshToken')){
            Handlers.authRefresh(res, credentials)
        }
    }
}

export default new TokenRoutes()