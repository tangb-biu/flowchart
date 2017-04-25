let gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename'),
	concat = require('gulp-concat'),
	copy = require('gulp-copy');
gulp.task('default', ['jsmin']);

gulp.task('jsmin', () => {
	gulp
	.src(['frender/**/*.js'])
	.pipe(concat('frender.js'))
	.pipe(gulp.dest('./dist'))
	.pipe(rename('frender.min.js'))
	.pipe(gulp.dest('./dist'))
	.pipe(uglify({
		mangle: true,
		compress: true,
	}))
	.pipe(gulp.dest('./dist'));
})