'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class InvestmentSchema extends Schema {
  up () {
    this.create('investments', (table) => {
      table.increments()
      table.string('towards')
      table.timestamps()
    })
  }

  down () {
    this.drop('investments')
  }
}

module.exports = InvestmentSchema
