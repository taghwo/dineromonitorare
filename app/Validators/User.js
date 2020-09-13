'use strict'

class User {
  get rules () {
    
    return {
      email: 'required|unique:users|email',
      password:'required|min:6',
      username:'string|min:2|unique:users'
    }
  }
  get messages(){
    return {
      'email.required': 'You must provide an email address.',
      'email.email': 'You must provide a valid email address.',
      'email.unique': 'This email is already registered.',
      'username.unique': 'This username is already registered.',
      'password.required': 'You must provide a password'
    }
  }
}

module.exports = User
