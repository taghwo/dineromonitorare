'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class Controller {
    respondWithError(message, code,response) {
        const status = this.statusFailed()

        return  response.status(code).json({status,message})
    }
    respondWithSuccess(message, code,response) {
        const status = this.statusSuccess()

        return  response.status(code).json({status,message})
    }
    respondWithData(data, response,message = '') {
        const status = this.statusSuccess()

        return response.status(200).json({status,data,message})
    }
    respondWithToken(token,data,response) {
        const status = this.statusSuccess()

        return  response.status(200).json({data,status,token})
    }
    statusSuccess() {
        return 'success'
    }
    statusFailed() {
        return 'failed'
    }
}
module.exports = Controller;
