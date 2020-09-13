'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ActivityTrackerSchema extends Schema {
  up () {
    this.createIfNotExists('activity_trackers', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.integer('earning_id').unsigned().references('id').inTable('earnings')
      table.string('action').nullable()
      table.json('payload').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('activity_trackers')
  }
}

module.exports = ActivityTrackerSchema
