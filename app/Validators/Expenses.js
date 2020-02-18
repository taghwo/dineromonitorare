'use strict'

class Earning {
  get rules () {
    return {
      'spent_on':'required|string',
      'amount':'number|min:1',
    }
  }
}

module.exports = Earning
