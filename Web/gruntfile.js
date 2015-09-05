/// <binding ProjectOpened='default' />
module.exports = function (grunt) {
    
    grunt.initConfig({

    	path: {
			root: 			'',
			src: {
				root: 		'Assets/Source/',
				less: 		'Assets/Source/Less/',
				styles: 	'Assets/Source/Styles/',
				scripts: 	'Assets/Source/Scripts/',
				images: 	'Assets/Source/Design/',
				fonts: 		'Assets/Source/Fonts/',
			},
			dist: {
				root: 		'Assets/Static/',
				styles: 	'Assets/Static/Styles/',
				scripts: 	'Assets/Static/Scripts/',
				images: 	'Assets/Static/Design/',
				fonts: 		'Assets/Static/Fonts/',
			},
			vendor: 		'node_modules/',
		},

		pkg: grunt.file.readJSON('package.json'),

		concat: {
			js: {
				files: {
				    '<%= path.dist.scripts %>scripts.build.js':
				    	[
				    		'<%= path.vendor %>jquery/dist/jquery.js',
				    		'<%= path.vendor %>unorphan/index.js',
				    		'<%= path.src.scripts %>**/*.js'
				    	]
				}
			}
		},

		uglify: {
			build: {
				src: ['<%= path.dist.scripts %>scripts.build.js'],
				dest: '<%= path.dist.scripts %>scripts.min.js'
			}
		},

		jshint: {
			build: {
				src: ['<%= path.src.scripts %>**/*.js', '<%= path.root %>gruntfile.js']
			},
		},

		less: {
			build: {
				files: {
					'<%= path.dist.styles %>less.build.css': [ '<%= path.src.less %>build.less']
				}
			}
		},

		autoprefixer: {
			options: {
				browsers: ['Android 2.3', 'Android >= 4', 'Chrome >= 20', 'Firefox >= 24', 'Explorer >= 8', 'iOS >= 6', 'Opera >= 12', 'Safari >= 6']
			},
			build: {
				src: '<%= path.dist.styles %>less.build.css'
			}
		},

		cssmin: {
			build: {
				files: {
					'<%= path.dist.styles %>site.min.css': [ '<%= path.dist.styles %>less.build.css' ]
				}
			}
		},

		clean: {
			build: {
			    src: ['<%= path.dist.root %>']
			}
		},

		imagemin: {
			build: {
				files: [{
					expand: true,
					cwd: '<%= path.src.images %>',
					src: ['**/*.{png,jpg,gif}'],
					dest: '<%= path.dist.images %>'
				}]
			}
		},

		copy: {
//			build: {
//				expand: true,
//				cwd: '<%= path.src.root %>',
//				src: ['**', '!**/less/**', '!**/images/**', '!**/scripts/**'],
//				dest: '<%= path.dist.root %>'
//			},
			fonts: {
				expand: true,
				cwd: '<%= path.src.fonts %>',
				src: '**',
				dest: '<%= path.dist.fonts %>',
			},
			fontawesome: {
				expand: true,
				cwd: '<%= path.vendor %>/font-awesome/fonts/',
				src: '**',
				dest: '<%= path.dist.fonts %>'
			}
		},

		watch: {
			js: {
				files: ['<%= path.src.scripts %>**/*.js'],
				tasks: ['jshint', 'concat', 'uglify']
			},
			less: {
				files: ['<%= path.src.less %>**/*.less'],
				tasks: ['less', 'autoprefixer', 'cssmin'] 
			},
			image: {
				files: ['<%= path.src.images %>**/*.{png,jpg,gif}'],
				tasks: ['imagemin']
			}
		}

	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-contrib-cssmin');	
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-autoprefixer');

	grunt.registerTask('default', ['build', 'watch']);
	grunt.registerTask('build', ['less', 'cssmin', 'autoprefixer', 'jshint', 'concat', 'uglify', 'imagemin', 'copy']);
	grunt.registerTask('clean-build', ['clean', 'build']);

};