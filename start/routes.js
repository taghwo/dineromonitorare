'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.on('/').render('welcome')
Route.get('about',function(){
   return 'working on about page';
})
Route.get('contacts','ContactController.index').as('contacts');

Route.group(() => { 
   Route.post('earning','EarningController.store').as('earning.store').validator('Earning').middleware(['auth'])
   Route.get('earning/:earning','EarningController.show').as('earning.show').middleware(['auth'])
   Route.put('earning/:earning','EarningController.update').as('earning.update').middleware(['auth'])
   Route.delete('earning/:earning','EarningController.delete').as('earning.delete').middleware(['auth'])
   Route.delete('earning','EarningController.index').as('earning.index').middleware(['auth'])
 }).prefix('api/v1')

 
Route.group(() => { 
   Route.post('expense','ExpenseController.store').as('expense.store').validator('Expenses').middleware(['auth'])
   Route.get('expense/:expense','ExpenseController.show').as('expense.show').middleware(['auth'])
   Route.put('expense/:expense','ExpenseController.update').as('expense.update').middleware(['auth'])
   Route.delete('expense/:expense','ExpenseController.destroy').as('expense.delete').middleware(['auth'])
   Route.get('expenses','ExpenseController.index').as('expense.index').middleware(['auth'])
 }).prefix('api/v1')



Route.post('join', 'UserController.register').as('auth.register').validator('User').middleware('guest').prefix('api/v1')

Route.get('authuser', 'UserController.authUser').as('auth.user').middleware('auth').prefix('api/v1')

Route.post('login', 'UserController.login').as('auth.login').middleware('guest').prefix('api/v1')


Route.get('users/:id', 'UserController.show').as('auth.user').middleware('auth')

Route.any('*', ({ view }) => view.render('vueapp'))