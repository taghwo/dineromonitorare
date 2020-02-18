'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Earning = use('App/Models/Earning')
const User = use('App/Models/User')
/**
 * Resourceful controller for interacting with earnings
 */
class EarningController {
  /**
   * Show a list of all earnings.
   * GET earnings
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
  }

  /**
   * Render a form to be used for creating a new earning.
   * GET earnings/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ view }) {
    return view.render('earning.create')
  }

  /**
   * Create/save a new earning.
   * POST earnings
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response,session }) {

    const earning = new Earning();
    earning.user_id = 1
    earning.expected_earnings = request.input('expected_earnings')
    earning.estimated_savings = request.input('estimated_savings')
    earning.number_of_days_in_month = '31'
  const user =  await User.create({
      username:'Miils Doe',
      password:'taghwo01',
      email:'mdeniro7@gmail.com'
    })

    earning.user_id = user.id
    await earning.save()
    session.flash({notification: 'New earning added'});
    response.redirect().route('earnings.index')

  }
  /**
   * Display a single earning.
   * GET earnings/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    earning = await Earning.find(params.id).first()

    return view.render('earnings.show',{earning:earning})
  }

  /**
   * Render a form to update an existing earning.
   * GET earnings/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update earning details.
   * PUT or PATCH earnings/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a earning with id.
   * DELETE earnings/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = EarningController
