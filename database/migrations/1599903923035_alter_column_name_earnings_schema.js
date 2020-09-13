'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AlterColumnNameEarningsSchema extends Schema {
  up () {
    this.table('earnings', (table) => {
      table.renameColumn('estimated_savings','expected_savings')
      table.renameColumn('expected_earnings','estimated_earnings')
    })
  }

  down () {
    this.table('alter_column_name_earnings', (table) => {
      // reverse alternations
    })
  }
}

module.exports = AlterColumnNameEarningsSchema
