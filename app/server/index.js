'use strict';


const server = require('./server');
const path = require('path');
const Seneca = require('seneca');


const seneca = server.app.seneca = Seneca();

seneca.client({
	type: 'web',
	port: process.env.SRV_USER_PORT,
	host: process.env.SRV_USER_HOST,
	pin: [{ service: 'user' }]
});



Promise.resolve()
	.then( registerPlugins(server) )
	.then( registerViews(server) )
	.then( registerRoutes(server) )
	.then( startServer(server) )

	.then(() => {
		console.log(server.info);
	},(err) => {
		console.error(err);
		process.exit(1);
	});




function registerPlugins(server) {

	return function() {
		return new Promise((resolve, reject) => {
			server.register([
				{
					register: require('vision')
				},
				{
					register: require('inert')
				}
			], (err) => {

				if(err) {
					return reject(err);
				}

				resolve();

			});
		})
	}

}


function registerRoutes(server) {
	return function() {
		require('./routes')(server);
	}
}

function registerViews(server) {
	return function() {

		server.views({
			engines: { pug: require('pug') },
			path: path.join(__dirname, 'views'),
			compileOptions: {
				pretty: true
			},
			isCached: false
		});

	}
}


function startServer(server) {
	return function() {
		return new Promise((resolve, reject) => {
			server.start((err) => {
				if(err) {
					return reject(err);
				}

				resolve();
			});
		})
	}
}
