module.exports = function(grunt) {
	'use strict';

	// includes
	grunt.loadNpmTasks('grunt-bower-task');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-csslint');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-bump');
	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
			clean: {
				bower: ["public/vendor/"],
				cssvendor: ["public/css/vendor/"],
				cssdist: ["public/css/dist/"],
				jsvendor: ["public/js/vendor/"],
			},
			bower: {
				install: {
					options: {
						cleanBowerDir: true,
						layout: 'byType',
						targetDir: 'public/vendor/',
						verbose: true
					}
				}
			},
			copy: {
				jsvendor: {
					flatten: true,
					expand: true,
					src: ['public/vendor/requirejs/require.js', 'public/vendor/jquery/jquery.js', 'public/vendor/bootstrap/bootstrap.js', 'public/vendor/swig/js/swig.js'],
					dest: 'public/js/vendor/'
				},
				cssvendor: {
					flatten: true,
					expand: true,
					src: ['public/vendor/normalize.css/normalize.css'],
					dest: 'public/css/vendor/'
				},
			},
			// ========== CSS ==========
			csslint: {
					src: ['css/km.css'],
					options: {
						ids: false
					}
				},
				cssmin: {
					dist: {
						options: {
							report: "gzip",
						},
						files: {
							"public/css/dist/km.min.css": ['public/css/vendor/*css', 'public/css/*css']
						}
					}
				},
				// ========== END CSS ==========
				// ========== JS ==========
				jshint: {
					files: ["public/js/km.js"]
				},

				uglify: {
					dist: {
						files: {
							'public/js/dist/km.min.js' : 'public/js/km.js'
						},
						options:{
							compress: true,
							report: 'gzip'
						}
					}
				}
				// ========== END JS ==========
		});

		// Default task: the works
		grunt.registerTask('default', ['css', 'js']);
		// JS
		grunt.registerTask('js', ['clean', 'bower', 'jshint', 'uglify']);
		// CSS
		grunt.registerTask('css', ['clean', 'bower', 'copy:cssvendor', 'csslint', 'cssmin']);
};
