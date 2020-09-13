'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
const Controller = require('./Controller');
const User = use('App/Models/User.js')

class UserController extends Controller {
    async login ({ auth, response,request }) {

        const credentials = request.only(['email','password'])

        try{
            const userToken = await auth.withRefreshToken().attempt(credentials)

            const user = await User.query().where('email', credentials.email).fetch()

            return this.respondWithData(
                {
                data:{token:userToken,
                     user: user}
                },response, 'Logged in successfully')
        } catch(err) {

            return this.respondWithError('Login attempt failed , try again later',404,response);

        }
    }

    async register({auth,response,request}) {

          const userData = request.only(['email','password','username'])

          try{ 

          const user =  await User.create(userData)

          const token = await auth.withRefreshToken().attempt(request.input('email'),request.input('password'))  

           return this.respondWithData(
            {
              data : {token,user},
            },
            response,
            'Account created successfully'
            )
        }catch(err){  
                    
            return this.respondWithError('Account could not be created , try again later',404,response);

        }
    }

    async authUser({auth}){

        return  await auth.getUser()

    }
}
module.exports = UserController
