'use strict'

const Controller = require('./Controller');

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Expense = use('App/Models/Expense')
/**
 * Resourceful controller for interacting with expenses
 */
class ExpenseController extends Controller{
  /**
   * Show a list of all expenses.
   * GET expenses
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({auth, response }) {
    const user = await auth.getUser();

    const expenses = await user.expenses().orderBy('created_at','desc').fetch()

    const sumExpenses = await user.expenses().getSum('amount')

    const avgExpenses = await user.expenses().getAvg('amount')

    const minExpenses = await user.expenses().getMin('amount')

    if(expenses.rows.length < 1) {

      return this.respondWithError('No expenses found for this user',404,response);

    }

    return this.respondWithData(
      { expenses:expenses,
        totalSpent:sumExpenses.toFixed(2),
        avgSpent:avgExpenses.toFixed(2),
        minSpent:minExpenses.toFixed(2)
      }
    )
  }

  /**
   * Create/save a new expense.
   * POST expenses
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ auth,request, response }) {

    const {spent_on,amount} = request.only(['spent_on','amount']) 

    const user = await auth.getUser()

    try{
      const expense = await Expense.create(
        { 'user_id' : user.id,
          'spent_on': spent_on,
          'amount':amount
        }
        )
        if(expense){

            return this.respondWithSuccess('Expense saved',201,response)
            
        }
      }catch(err){

        return this.respondWithError('There was an error saving the expense, try again later',417,response);

      }
  }
  /**
   * Display a single expense.
   * GET expenses/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ auth, params, response}) {

      const authuser = await getUser(auth)

      const earning = await authuser.expenses().where('id',params.expense).first()

      if(!earning) {
      
        return this.respondWithError('Sorry that expense was not found',404,response);

      }

       return this.respondWithData(expense,response)     
  }

  /**
   * Update expense details.
   * PUT or PATCH expenses/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request,auth, response }) {

    const user = await auth.getUser()

    const expense = await user.expenses().where('id',params.expense).first()

    if(!expense) {

      return this.respondWithError('Sorry that expense was not found',404,response);

    }
    
    const updatedData = request.only(['spent_on','amount'])
    
    try{
          expense.merge(updatedData)

          await expense.save()

          return this.respondWithData(expense,response,'expense updated')
        
      }catch(err){

        return this.respondWithError('Sorry the server could not handle the request, try again later',417,response);

      }
  }

  /**
   * Delete a expense with id.
   * DELETE expenses/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, auth, response }) {
  
    const authuser = await getUser(auth)

    const expense = await authuser.expenses().where('id',params.expense).first()

    if(!expense) {

      return this.respondWithError('Sorry that earning was not found',404,response);

    }

    try{  

      await earning.delete()

      return this.respondWithSuccess(`expense was deleted`,response)
     
    }catch(err){

      return this.respondWithError('There was an error deleting the expense, try again later',417,response);

    }
  }
}

module.exports = ExpenseController
