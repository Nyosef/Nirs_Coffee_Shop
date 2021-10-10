// Full Documentation - https://docs.turbo360.co
// Nir Yosef's project using turbo360, which acts as a CMS - defined for the posts, items and orders
// touches backend technologies and template engines
//Enjoy the coffee house website! 



const vertex = require('vertex360')({ site_id: process.env.TURBO_APP_ID })
const express = require('express')

const app = express() // initialize app

/*  Apps are configured with settings as shown in the conig object below.
    Options include setting views directory, static assets directory,
    and database settings. Default config settings can be seen here:
    https://docs.turbo360.co */

const config = {
  views: 'views', // Set views directory
  static: 'public', // Set static assets directory
  logging: true,

  /*  To use the Turbo 360 CMS, from the terminal run
      $ turbo extend cms
      then uncomment line 21 below: */

   db: vertex.nedb()
}

vertex.configureApp(app, config)

const main = require('./routes/main');
app.use('/', main);


module.exports = app
