let gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename'),
	copy = require('gulp-copy');
gulp.task('default', () => {
	gulp
	.src(['./zrender.js'])
	.pipe(copy('./'))
	.pipe(rename("zrender.min.js"))
	.pipe(uglify({
		mangle: true,
		compress: true,
		//preserveComments: 'all'
	}))
	.pipe(gulp.dest('./dist'));
})