'use strict'

class Earning {
  get rules () {
    return {
      'estimated_earnings':'required|number|min:2',
      'expected_savings':'number|min:2',
      'period': 'required|date',
    }
  }

  get messages() {
    return{
      'period.required': 'Please select a month and year'
    }
  }
}

module.exports = Earning
