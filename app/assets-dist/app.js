$(document).ready(function() {

	var $user = $('.user');

	$('button.btn--loaduser').click(function() {

		$user.text('Loading ...');

		$.get('/api/users/random')
			.then(function(res) {
				$('.user').text( JSON.stringify(res, null, 4) );
			})
			.catch(function(err) {
				console.error(err);
			});

	})

});
