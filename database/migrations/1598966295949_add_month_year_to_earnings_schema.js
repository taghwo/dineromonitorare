'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddMonthYearToEarningsSchema extends Schema {
  async up () {
    const exists = await this.hasTable('earnings')
    if(exists) {
    this.alter('earnings', (table) => {
      table.string('month',50).nullable(),
      table.string('year',50).nullable()
    })
  }
  }
}

module.exports = AddMonthYearToEarningsSchema
