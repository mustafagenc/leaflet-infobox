'use strict';

module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks("grunt-remove-logging");
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-todos');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        meta: {
            banner:
                '/* \n' +
                ' * Leaflet Information Box v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> \n' +
                ' * \n' +
                ' * Copyright <%= grunt.template.today("yyyy") %> <%= pkg.author.name %> \n' +
                ' * <%= pkg.author.email %> \n' +
                ' * <%= pkg.author.url %> \n' +
                ' * \n' +
                ' * Licensed under the <%= pkg.license %> license. \n' +
                ' * \n' +
                ' * Demo: \n' +
                ' * <%= pkg.homepage %> \n' +
                ' * \n' +
                ' * Source: \n' +
                ' * <%= pkg.repository.url %> \n' +
                ' * \n' +
                ' */\n'
        },
        clean: {
            dist: {
                src: ['dist/*']
            }
        },
        removelogging: {
            dist: {
                src: 'dist/*.js'
            }
        },
        jshint: {
            options: {
                globals: {
                    'no-console': true,
                    module: true
                },
                '-W099': true,
                '-W033': true,
                '-W044': true,
                '-W104': true,
            },
            files: ['src/*.js']
        },
        concat: {
            options: {
                banner: '<%= meta.banner %>'
            },
            dist: {
                files: {
                    'dist/leaflet-informationbox.src.js': ['src/leaflet-informationbox.js'],
                    'dist/leaflet-informationbox.src.css': ['src/leaflet-informationbox.css']
                }
            }
        },
        uglify: {
            options: {
                banner: '<%= meta.banner %>'
            },
            dist: {
                files: {
                    'dist/leaflet-informationbox.min.js': ['dist/leaflet-informationbox.src.js']
                }
            }
        },
        cssmin: {
            combine: {
                files: {
                    'dist/leaflet-informationbox.min.css': ['src/leaflet-informationbox.css']
                }
            },
            options: {
                banner: '<%= meta.banner %>'
            },
            minify: {
                expand: true,
                cwd: 'dist/',
                files: {
                    'dist/leaflet-informationbox.min.css': ['src/leaflet-informationbox.css']
                }
            }
        },
        todos: {
            options: { verbose: false },
            TODO: ['src/*.js'],
        },
        watch: {
            dist: {
                options: { livereload: true },
                files: ['src/*'],
                tasks: ['clean', 'concat', 'cssmin', 'jshint']
            }
        }
    });

    grunt.registerTask('default', [
        'clean',
        'concat',
        'cssmin',
        'removelogging',
        'jshint',
        'uglify',
        'todos'
    ]);

};