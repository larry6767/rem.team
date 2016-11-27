'use strict';

const gulp = require('gulp');
const stylus = require('gulp-stylus');
const sourcemaps = require('gulp-sourcemaps');
const debug = require('gulp-debug');
// const gulpIf = require('gulp-if');
const del = require('del');
const newer = require('gulp-newer');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const notify = require('gulp-notify');
const combiner = require('stream-combiner2').obj;

const minify = require('gulp-csso');
const rename = require('gulp-rename');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const pug = require('gulp-pug');
const critical = require('critical').stream;


// const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

gulp.task('html', function() {

	return combiner(
		gulp.src('src/library/index.pug'),
		pug({
	      pretty: true
	    }),
		gulp.dest('public')
	).on('error', notify.onError());

});

gulp.task('styles', function() {

	return combiner(
		gulp.src('src/library/style.styl'),
		sourcemaps.init(),
		stylus(),
		autoprefixer(),
		sourcemaps.write(),
		gulp.dest('public/css'),
		minify(),
		rename('style.min.css'),
		gulp.dest('public/css')
	).on('error', notify.onError());

});

gulp.task('critical', function() {

	return combiner(
		gulp.src('public/*.html'),
		notify("critical! <%= file.relative %>"),
		critical({
		    inline: true,
		    css: ['public/css/style.css'],
		    width: 1300,
		    height: 900,
		    minify: true
		}),
		gulp.dest('public/')
	).on('error', notify.onError());
	
});

gulp.task('js', function() {

	return combiner(
		gulp.src('src/js/main.js'),
		uglify(),
		gulp.dest('public/js')
	).on('error', notify.onError());

});

gulp.task('vendor-css', function() {

	return combiner(
		gulp.src('src/js/plagins/*.css'),
		concat('vendor.css'),
		minify(),
		gulp.dest('public/css')
	).on('error', notify.onError());

});

gulp.task('vendor-js', function() {

	return combiner(
		gulp.src('src/js/plagins/*.js'),
		concat('vendor.js'),
		uglify(),
		gulp.dest('public/js')
	).on('error', notify.onError());

});

gulp.task('clean', function() {
	return del('public');
});

gulp.task('assets', function() {
	return gulp.src('src/{img,fonts}/**/*.*', {since: gulp.lastRun('assets')})
		.pipe(newer('public'))
		.pipe(debug({title:'assets'}))
		.pipe(gulp.dest('public'));
});

gulp.task('build', gulp.series(
	'clean',
	gulp.parallel('html', 'styles', 'js', 'vendor-css', 'vendor-js', 'assets'))
);

gulp.task('watch', function() {
	gulp.watch('src/library/**/*.pug', gulp.series('html'));
	gulp.watch('src/library/**/*.styl', gulp.series('styles'));
	gulp.watch('src/js/main.js', gulp.series('js'));
	gulp.watch('src/js/plagins/*.css', gulp.series('vendor-css'));
	gulp.watch('src/js/plagins/*.js', gulp.series('vendor-js'));
	gulp.watch('src/{img,fonts}/**/*.*', gulp.series('assets'));
});

gulp.task('serve', function() {
	browserSync.init({
		server: 'public'
	});

	browserSync.watch('public/**/*.*').on('change', browserSync.reload);
});

gulp.task('dev', gulp.series(
	'build',
	 gulp.parallel('watch', 'serve'))
);
