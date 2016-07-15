'use strict';

const Hapi = require('hapi');

const server = module.exports = new Hapi.Server();

server.connection({
	host: process.env.HOST || 5555,
	port: process.env.PORT || '127.0.0.1'
});
