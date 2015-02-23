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
				cssdist: ["public/css/dist/"]
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
				cssvendor: {
					flatten: true,
					expand: true,
					src: ['public/vendor/normalize.css/normalize.css'],
					dest: 'public/css/vendor/'
				},
			},
			// ========== CSS ==========
			csslint: {
				src: ['public/css/km.css'],
				options: {
					"compatible-vendor-prefixes": false,
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
				options: {
					jshintrc: true,
					reporter: require('jshint-stylish')
				},
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
		grunt.registerTask('default', ['clean', 'bower', 'css', 'js']);
		// JS
		grunt.registerTask('js', ['jshint', 'uglify']);
		// CSS
		grunt.registerTask('css', ['copy:cssvendor', 'csslint', 'cssmin']);
};
