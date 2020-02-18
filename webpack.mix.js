const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/js/app.js', 'public/js')
    // .copy('node_modules/vue-ckeditor5/src/vue-ckeditor.js', 'public/js/admin/vue-ckeditor.js')
    // .js('resources/js/frontend/newsletter.js', 'public/js/frontend')
    // .js('resources/js/frontend/auth.js', 'public/js/frontend')
    // .js('resources/js/frontend/register.js', 'public/js/frontend')
    // .js('resources/js/app-main.js', 'public/js')
    // .js('resources/js/admin/datatable.js', 'public/js/admin')
    // .sass('resources/sass/app.scss', 'public/css')
    // .sass('resources/sass/frontend.scss', 'public/css/frontend')
    // .sass('resources/sass/frontend/style.scss', 'public/css/frontend')
    // .sass('resources/sass/signup.scss', 'public/css/frontend')
    .extract(['vue','jquery','vue-template-compiler','axios','bootstrap','popper.js','vuex'])
    .sourceMaps();