'use strict';


const gulp = require('gulp');

const sass = require('gulp-sass');
const plumber = require('gulp-plumber');
const autoprefixer = require('gulp-autoprefixer');
const minifyCss = require('gulp-minify-css');



gulp.task('styles-dev', function() {

	return gulp.src('./assets-src/*.scss')
		.pipe( plumber() )
		.pipe( sass() )
		.pipe( autoprefixer('last 3 versions', '> 1%', 'ie 8') )
		.pipe( plumber.stop() )
		.pipe( gulp.dest('./assets-dist') );

})


gulp.task('styles-build', function() {

	return gulp.src('./assets-src/*.scss')
		.pipe( plumber() )
		.pipe( sass({outputStyle: 'compressed'}) )
		.pipe( autoprefixer('last 3 versions', '> 1%', 'ie 8') )
		.pipe( plumber.stop() )
		.pipe( gulp.dest('./assets-dist') )

});




// Only to demonstrate, that there is a script tast ;)
gulp.task('scripts', function() {

	return gulp.src('./assets-src/*.js')
		.pipe( gulp.dest('./assets-dist') );

});







gulp.task('watch', ['styles-dev', 'scripts'], function() {
	gulp.watch('./assets-src/*.scss', ['styles-dev']);
	gulp.watch('./assets-src/*.js', ['scripts']);
});


gulp.task('build', ['styles-build', 'scripts']);
