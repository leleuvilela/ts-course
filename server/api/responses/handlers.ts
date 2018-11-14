import { Request, Response, ErrorRequestHandler, NextFunction } from 'express'
import * as HTTPStatus from 'http-status'
import * as jwt from 'jsonwebtoken'
import * as bcrypt from 'bcrypt'
import { decode } from 'punycode';
const hal = require('hal');
const config = require('../../config/env/config')()
const tokenList = {}

class Handlers {

    authFail(req: Request, res: Response) {
        res.sendStatus(HTTPStatus.UNAUTHORIZED)
    }

    authSuccess(res: Response, credentials: any, data: any) {
        const isMatch = bcrypt.compareSync(credentials.password, data.password)

        if (isMatch) {
            const payload = {
                    id: data.id
                }
            const response = {
                status: "Logged in",
                token: jwt.sign(payload, config.secret, { expiresIn: config.expTokenTime }),
                refreshToken:jwt.sign(payload, config.secret, { expiresIn: config.expRefreshTokenTime })
            }
            tokenList[response.refreshToken] = response
            res.json(response)
        } else {
            res.sendStatus(HTTPStatus.UNAUTHORIZED)
        }
    }

    authRefresh(res: Response, credentials) {
        
        if((credentials.refreshToken) && (credentials.refreshToken in tokenList)) {
            try { 
                const decoded:any = jwt.verify(credentials.refreshToken, config.secret)
                const payload = {
                        id: decoded.id
                    }
                const response = {
                    token: jwt.sign(payload, config.secret, { expiresIn: config.expTokenTime })
                }
                tokenList[credentials.refreshToken] = response
                res.json(response)
            } catch (err){
                res.sendStatus(HTTPStatus.UNAUTHORIZED)
            }
        } else {
            res.sendStatus(HTTPStatus.UNAUTHORIZED)
        }
    }

    onError(res: Response, message: string, err: any) {
        console.log(`Error: ${err}`)
        res.status(HTTPStatus.INTERNAL_SERVER_ERROR).send(message);
    }

    onSuccess(res: Response, data: any) {
        var resource = new hal.Resource({ atual: 1, total: 10}, '/data');
        resource.embed("payload", data)
        resource.link('fist', '/1/first');
        resource.link('last', '/1/last');
        resource.link('next', '/1/next');
        res.status(HTTPStatus.OK).json(resource.toJSON());
    }

    errorHandlerApi(err: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) {
        console.error(`API error handler foi executado: ${err}`);
        res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({
            errorCode: 'ERR-001',
            message: 'Erro interno do servidor'
        });
    }

    dbErrorHandler(res: Response, err: any) {
        console.log(`Erro no DB: ${err}`)
        res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({
            code: 'ERR-01',
            message: 'Erro no role do db'
        })
    }
}

export default new Handlers()