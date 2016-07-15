'use strict';

const  randomUser = require('random-user');

module.exports = function(options) {

	this.add({
		service: 'user',
		cmd: 'getRandom'
	}, function(args, cb) {

		randomUser()
			.then((user) => {
				cb(null, user);
			})

	});

}
