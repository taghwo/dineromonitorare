'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
const User = use('App/Models/User.js')
class UserController {

    async login ({ auth, response,request }) {
        const { email, password } = request.all()
        const userToken = await auth.withRefreshToken().attempt(email, password)//login user return refresh token with token
        const user = auth.user
        return response.status(200).send({
            'status':'success',
            'token':userToken,
            'data':user
        })
      }

      async register({auth,response,request}) {
          const {email,username,password} = request.all()
         
          try{                      //create user
           await User.create({
            username:username,
            email:email,
            password:password
          })
        }catch(err){                //catch errors
            return response.status(err.status).send(err)
        }
        const authUser = await auth.withRefreshToken().attempt(email,password)        
        return  authUser
        }

        async authUser({auth}){
            return  await auth.getUser()
        }
}

module.exports = UserController
