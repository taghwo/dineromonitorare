'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EarningSchema extends Schema {
  async up () {
    const exists = await this.hasTable('earnings')
    if(!exists) {
    this.create('earnings', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.string('expected_earnings').notNullable()
      table.string('estimated_savings').notNullable()
      table.string('number_of_days_in_month').notNullable()
      table.string('earning_from').notNullable()
      table.boolean('status').defaultTo('1')
      table.timestamps()
    })
  }
  }

  down () {
    this.drop('earnings')
  }
}

module.exports = EarningSchema
