'use strict'

class Earning {
  get rules () {
    return {
      'spent_on':'required|string|min:2|max:500',
      'amount':'required|number|min:1',
      'month':'required|string|max:50',
      'year':'required|string|max:50',
      'number_of_days_in_month':'required|string'
    }
  }
}

module.exports = Earning
