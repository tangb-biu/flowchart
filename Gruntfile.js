
module.exports = function (grunt) {

	require('load-grunt-tasks')(grunt);

	require('time-grunt')(grunt);

	grunt.initConfig({
		connect: {
			options: {
				port: 9000,
				hostname: "localhost",
				livereload: 35729
			},
			server: {
				options: {
					open: true,
					base: './'
				}
			}
		},
		watch: {
			livereload: {
				options: {
					livereload: '<%=connect.options.livereload%>'
				},
				files: [
					'./zrender/{,*/}*.*',
					'./{,*/}*.*'
				],
			}
		}
	});

	grunt.registerTask('default', [
		'connect:server',
		'watch'
	])
}