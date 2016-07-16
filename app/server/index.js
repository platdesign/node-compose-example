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



server.register([
	{
		register: require('vision')
	},
	{
		register: require('inert')
	}
])
.then(() => {

	server.views({
		engines: { pug: require('pug') },
		path: path.join(__dirname, 'views'),
		compileOptions: {
			pretty: true
		},
		isCached: false
	});

	require('./routes')(server);

	return server.start();

})
.then(() => {
	console.log(server.info);
},(err) => {
	console.error(err);
	process.exit(1);
});

