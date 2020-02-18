'use strict'

class Earning {
  get rules () {
    return {
      'expected_earnings':'required|integer',
      'estimated_savings':'string',
    }
  }
}

module.exports = Earning
