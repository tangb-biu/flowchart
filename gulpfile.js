const gulp = require('gulp'),
	  uglify = require('gulp-uglify'),
	  concat = require('gulp-concat'),
	  rename = require('gulp-rename'),
	  connect = require('gulp-connect');

gulp.task('jsmin', () => {
	gulp
	.src(['src/frender/**/*.js', 'src/custom/**/*.js'])
	.pipe(concat('frender.js'))
	.pipe(gulp.dest('src/lib'))
	.pipe(rename('frender.min.js'))
	.pipe(gulp.dest('src/lib'))
	.pipe(uglify({
		mangle: true,
		compress: true,
	}))
	.pipe(gulp.dest('src/lib'))
	.pipe(connect.reload());
})

gulp.task('connect', function () {
	connect.server({
		root: './',
		livereload: true
	})
});

gulp.task('html', function () {
	gulp
	.src('test/**/*.html')
	.pipe(connect.reload());
})

gulp.task('watch', function(){
	gulp.watch('test/**/*.html', ['html']);
	gulp.watch(['src/frender/**/*.js', 'src/custom/**/*.js'], ['jsmin']);
})

gulp.task('default', ['jsmin', 'connect', 'watch']);