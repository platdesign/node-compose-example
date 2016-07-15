'use strict';


const Seneca = require('seneca');


const server = Seneca({
	logging: 'all'
});


server.use( require('./plugin'), {});


server.listen({
	type: 'web',
	port: process.env.PORT,
	host: process.env.HOST
});
