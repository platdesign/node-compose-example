'use strict';

const path = require('path');


module.exports = function(server) {

	server.route({
		method: 'GET',
		path: '/assets/{param*}',
		handler: {
			directory: {
				path: path.resolve(__dirname, '..', '..', 'assets-dist'),
				listing: false
			}
		}
	});

	server.route({
		method: 'GET',
		path: '/',
		handler: function(req, reply) {
			reply.view('home', {});
		}
	});

	server.route({
		method: 'GET',
		path: '/api/users/random',
		handler: function(req, reply) {

			server.app.seneca.act({
				service: 'user',
				cmd: 'getRandom'
			}, function(err, res) {
				reply(err, res);
			})

		}
	});

};
