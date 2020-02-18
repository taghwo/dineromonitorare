'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Earning extends Model {

    user(){
        return this.belongsTo('App/Models/Users')
    }
}

module.exports = Earning
