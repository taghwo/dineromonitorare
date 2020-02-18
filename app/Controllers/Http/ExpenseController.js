'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Expense = use('App/Models/Expense')
/**
 * Resourceful controller for interacting with expenses
 */
class ExpenseController {
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
    const expenses= await user.expenses().fetch()
    const sumExpenses = await user.expenses().getSum('amount')
    const avgExpenses = await user.expenses().getAvg('amount')
    const minExpenses = await user.expenses().getMin('amount')
    return response.status(200).send({
      status:'success',
      data:expenses,
      totalSpent:sumExpenses,
      avgSpent:avgExpenses,
      minSpent:minExpenses
    })

  }

  /**
   * Render a form to be used for creating a new expense.
   * GET expenses/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
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
    const user = await auth.getUser();

    const {spent_on,amount} = request.only(['spent_on','amount']) 
    try{
      const expense = await Expense.create(
        { 'user_id' : user.id ,
          'spent_on': spent_on,
          'amount':amount
        }
        )

        if(expense){
          return response.status(201).json({
            'status':'success',
            'message':'expense saved'
          })
        }
      }catch(err){
        return response.status(400).send(err)
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
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing expense.
   * GET expenses/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update expense details.
   * PUT or PATCH expenses/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {

    try{
      const expense = await Expense.find(params.expense)

         expense.spent_on = request.input('spent_on')?request.input('spent_on'):expense.spent_on,
         expense.amount = request.input('amount')?request.input('amount'):expense.amount
         expense.save()

        if(expense.save()){
          return response.status(200).json({
            status:'success',
            message:'expense updated',
            data: expense
          })
        }
      }catch(err){
        return response.status(400).send(err)
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
  async destroy ({ params, request, response }) {
    try{      
        const expense = await Expense.find(params.expense)
       if(!expense){
        return response.status(404).json({
          status:'failed',
          message:'Sorry no record exist for that expense',
        })
        }
        await expense.delete()
          return response.status(200).json({
            status:'success',
            message:`expense for ${expense.spent_on} was deleted`,
          })
        
      }catch(err){
        return response.status(400).send(err.message)
      }
  }
}

module.exports = ExpenseController
