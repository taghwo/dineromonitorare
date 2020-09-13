'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Earning extends Model {

    static get hidden() {
        return [
            'updated_at'
        ]
    }
    user(){
        return this.belongsTo('App/Models/Users')
    }
}

module.exports = Earning
