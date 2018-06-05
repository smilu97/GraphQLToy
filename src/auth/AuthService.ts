import * as express from 'express';
import { Service } from 'typedi';

import { Logger, LoggerInterface } from '../decorators/Logger';

@Service()
export class AuthService {

    // private httpRequest: typeof request;

    constructor(
        @Logger(__filename) private log: LoggerInterface
    ) {
        // this.httpRequest = request;
    }

    public parseTokenFromRequest(req: express.Request): string | undefined {
        const authorization = req.header('Authorization');

        // Retrieve the token form the Authorization header
        if (authorization && authorization.split(' ')[0] === 'Basic') {
            this.log.info('Token provided by the client');
            return authorization.split(' ')[1];
        }

        this.log.info('No Token provided by the client');
        return undefined;
    }

    // public getTokenInfo(token: string): Promise<TokenInfoInterface> {
    //     return new Promise((resolve, reject) => {
    //         this.httpRequest({
    //             method: 'POST',
    //             url: env.auth.route,
    //             form: {
    //                 id_token: token,
    //             },
    //         }, (error: any, response: request.RequestResponse, body: any) => {
    //             // Verify if the requests was successful and append user
    //             // information to our extended express request object
    //             if (!error) {
    //                 if (response.statusCode === 200) {
    //                     const tokeninfo = JSON.parse(body);
    //                     return resolve(tokeninfo);
    //                 }
    //                 return reject(body);
    //             }
    //             return reject(error);
    //         });
    //     });
    // }

}
