module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-cdn');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-filerev');
    grunt.loadNpmTasks('grunt-rev');
    grunt.loadNpmTasks('grunt-usemin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-strip');
    grunt.loadNpmTasks('grunt-includes');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-mustache-render');

    // Define the configuration for all the tasks
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            dev: {
                src: ["dev"]
            },
            build: {
                src: ["dist", "test", ".tmp", "tmp", "dest", ".tmp"]
            },

            trash: {
                src: [".tmp"]
            }
        },

        rev: {
            options: {
                encoding: 'utf8',
                algorithm: 'md5',
                length: 8
            },
            dist: {
                files: {
                    src: [
                        'dev/**/*.{js,css,img,jpg,gif,png}'
                    ]
                }
            }
        },

        useminPrepare: {
            src: ['src/includes/head.html', 'src/includes/footer.html'],
            options: {
                dest: 'dev', // destino arquivos concatenados -> unificados
                root: 'src'
            }
        },

        usemin: {
            html: 'dev/**/*.html',
            options: {
                assetsDirs: ['dev']
            }
        },

        includes: {
            dev: {
                options: {
                    debug: false
                },
                files: [{
                    cwd: 'dev/',
                    src: ['**/*.html'],
                    dest: 'dev' // it must override
                }]
            }
        },

        copy: {
            dev: {
                files: [
                    {
                        cwd: 'src/',
                        src: ['*.html', 'includes/*.html', 'resources/js/config.js'],
                        dest: 'dev',
                        expand: true
                    }
                ]
            },
            package: {
                files: [
                    {
                        cwd: 'dev/',
                        expand: true,
                        src: ['*.html', 'resources/**'],
                        dest: 'dist'
                    }
                ]
            }
        },

        htmlmin: {
            dist: {
                options: {
                    collapseWhitespace: true,
                    collapseBooleanAttributes: true,
                    removeCommentsFromCDATA: true,
                    removeOptionalTags: true
                },
                files: [{
                    expand: true,
                    cwd: 'dist',
                    src: ['**/*.html'],
                    dest: 'dist'
                }]
            }
        },

        // STRIP CONSOLE.log
        strip: {
            main: {
                src: 'dist/resources/**/*.js',
                options: {
                    inline: true
                }
            }
        },


        concat: {
            analytics: {
                src: ['dev/includes/analytics.html', 'dev/includes/head.html'],
                dest: 'dev/includes/head.html'

            }
        },

        watch: {
            scripts: {
                files: ['src/**/*.*'],
                tasks: ['dev'],
                options: {
                    debounceDelay: 1000
                    //spawn: false
                }
            }
        }
    });


    grunt.registerTask('dev', [
        'clean:dev',
        'clean:build',
        'copy:dev',
        'includes:dev',
        'useminPrepare',
        'concat:generated',
        'cssmin:generated',
        'uglify:generated',
        'rev',
        'usemin',
        'clean:trash'
    ]);

    grunt.registerTask('package', [
        'clean:build',
        'copy:dev',
        'concat:analytics',
        'includes:dev',
        'useminPrepare',
        'concat:generated',
        'cssmin:generated',
        'uglify:generated',
        'rev',
        'usemin',
        'clean:trash',
        'copy:package',
        'htmlmin:dist',
        'strip:main',
        'clean:dev'
    ]);
};
