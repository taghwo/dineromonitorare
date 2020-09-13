'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Controller = require('./Controller');
const Earning = use('App/Models/Earning')
const moment = require('moment');
const { getId, getUser} = use('App/Helpers')
/**
 * Resourceful controller for interacting with earnings
 */
class EarningController extends Controller{

  /**
   * Show a list of all earnings.
   * GET earnings
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * 
   */
  async index ({ response, auth }) {
    const user = await getUser(auth);

    const earnings = await user.earnings().orderBy('created_at','desc').fetch()

    const sumearnings = await user.earnings().getSum('estimated_earnings')

    const avgearnings = await user.earnings().getAvg('estimated_earnings')

    const minearnings = await user.earnings().getMin('estimated_earnings')

    if(earnings.rows.length < 1) {

      return this.respondWithError('No earnings found for this user',404,response);

    }

      return this.respondWithData(
        {     earnings:earnings,
              totalSpent:sumearnings.toFixed(2),
              avgSpent:avgearnings.toFixed(2),
              minSpent:minearnings.toFixed(2)
        },
        response
      )
  }

 
  /**
   * Create/save a new earning.
   * POST earnings
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, auth }) { 

    let daysInMonth =  moment(request.input('period')).daysInMonth();

    let month =  moment(request.input('period')).month()+1;

    let year =  moment(request.input('period')).year();
    
    let earningExistForCurrentMonth =  await this.verifyNoduplicateMonthEarning(month,year,auth)

    if(earningExistForCurrentMonth.rows.length > 0) {

      return this.respondWithError('You already have an estimated earning for this month, please update this earning instead',400,response);

    }

    const user_id = await getId(auth)

    try{

        const earning = await Earning.create({
          'user_id' : user_id,
          'estimated_earnings' : request.input('estimated_earnings'),
          'expected_savings' : request.input('expected_savings'),
          'month' : month,
          'year' : year,
          'days_in_month' : daysInMonth
        })

        if (earning) {

            return this.respondWithSuccess('Earning saved',201,response)

        }

    }catch(err){

      return this.respondWithError('There was an error saving the expense, try again later',417,response);

    }
  }

   /**
   * Create/save a new earning.
   * POST earnings
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async verifyNoduplicateMonthEarning(month,year,auth) {

    const authuser = await getUser(auth)

    return await authuser.earnings()
                          .where('month',month)
                          .where('year',year)
                          .fetch()
  }
  /**
   * Display a single earning.
   * GET earnings/:id
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, response, auth }) {
   
      const authuser = await getUser(auth)

      const earning = await authuser.earnings().where('id',params.earning).first()

      if(!earning) {
      
        return this.respondWithError('Sorry that earning was not found',404,response);

      }

       return this.respondWithData(earning,response)
  }



  /**
   * Update earning details.
   * PUT or PATCH earnings/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, auth, response }) {

    const authuser = await getUser(auth)

    const earning = await authuser.earnings().where('id',params.earning).first()

    if(!earning) {

      return this.respondWithError('Sorry that earning was not found',404,response);

    }
  
    let updatedData = request.only(['estimated_earnings','expected_savings'])

    if(request.input('period')) {

      let daysInMonth = moment(request.input('period')).daysInMonth();

      let month =  moment(request.input('period')).month()+1;

      let year =  moment(request.input('period')).year();

      updatedData.days_in_month = daysInMonth

      updatedData.month = month

      updatedData.year = year

    }

    earning.merge(updatedData)

    try{
          await earning.save()

          return this.respondWithData(earning,response,'earning updated')
        
      }catch(err){

          return this.respondWithError('Sorry the server could not handle the request, try again later',417,response);
          
      }
  }

  /**
   * Delete a earning with id.
   * DELETE earnings/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, auth, response }) {

    const authuser = await getUser(auth)

    const earning = await authuser.earnings().where('id',params.earning).first()

    if(!earning) {

      return this.respondWithError('Sorry that earning was not found',404,response);

    }

    try{  

      await earning.delete()

      return this.respondWithSuccess(`earning was deleted`,response)
     
    }catch(err){

      return this.respondWithError('There was an error deleting the earning, try again later',417,response);

    }

  }

}

module.exports = EarningController
