'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ExpensesSchema extends Schema {
  async up () {
    const exists = await this.hasTable('expenses')
    if(!exists) {
    this.create('expenses', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users')     
      table.string('spent_on').notNullable()
      table.decimal('amount',15,2).notNullable().unsigned()
      table.boolean('status').defaultTo('1')
      table.timestamps()
    })
  }
  }

  down () {
    this.drop('expenses')
  }
}

module.exports = ExpensesSchema
