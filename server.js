/*
	NOTE - https://github.com/fridays/next-routes
*/

// server.js
const next = require('next')
const routes = require('./routes')
const app = next({dev: false})
const handler = routes.getRequestHandler(app)

// Without express
const {createServer} = require('http')
app.prepare().then(() => {
	console.log('Server is prepared ...')
	console.log(process.env.PORT)
  createServer(handler).listen(process.env.PORT || 3000)
});