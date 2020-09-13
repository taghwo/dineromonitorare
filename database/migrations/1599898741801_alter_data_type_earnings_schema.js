'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AlterDataTypeEarningsSchema extends Schema {
  up () {
    this.table('earnings', (table) => {
      table.decimal('expected_earnings',19,4).notNullable().alter()
      table.decimal('estimated_savings',19,4).notNullable().alter()
      table.dropColumn('number_of_days_in_month')
      table.integer('days_in_month').notNullable().defaultTo(31)
    })
  }

  down () {
    this.table('alter_data_type_earnings', (table) => {
      table.decimal('expected_earnings',19,4).notNullable().alter()
      table.decimal('estimated_savings',19,4).notNullable().alter()
      table.integer('days_month').notNullable().defaultTo(31)
    })
  }
}

module.exports = AlterDataTypeEarningsSchema
