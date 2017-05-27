'use strict';

module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        // 确保代码中没有明显的错误
        jshint: {
          options: {
            jshintrc: '.jshintrc',
            reporter: require('jshint-stylish')
          },
          all: {
            src: [
              'Gruntfile.js',
              '<%= pkg.appPath %>/**/*.js'
            ]
          }
        },

        // 统一代码风格
        jscs: {
          options: {
            config: '.jscsrc',
            verbose: true
          },
          all: {
            src: [
              'Gruntfile.js',
              '<%= pkg.appPath %>/**/*.js'
            ]
          }
        },
        clean: {
            options: {
                force: true
            },
            dist: ['dist']
        },
        copy: {
            index: {
                expand: true,
                cwd: 'src/',
                src: 'index.html',
                dest: 'dist'
            },
            login:{
              expand: true,
              cwd: 'src/',
              src: 'login.html',
              dest: 'dist'
            },
            assets: {
                expand: true,
                cwd: 'src/assets/',
                src: '**/*',
                dest: 'dist/assets/'
            },
            data: {
            expand: true,
            cwd: 'src/data/',
            src: '**/*',
            dest: 'dist/data/'
          }
        },
        // The actual grunt server settings
        connect: {
          options: {
            port: 9000,
            // Change this to '0.0.0.0' to access the server from outside.
            hostname: 'localhost',
            livereload: 35729
          },
          livereload: {
            options: {
              open: true,
              middleware: function (connect) {
                return [
                  connect.static('src')
                ];
              }
            }
          }
        },
        concat: {
            options: {
                //separator: ';'
            },
            allInOne: { //所有JS文件全部合并成一份文件
                // src: ['src/js/**/*.js'],
                // dest: 'dist/src-concated/js/<%= pkg.name %>.js'
            }
        },
        uglify: {
            options: {
                // banner: '/*! <%= pkg.name %> <%= grunt.template.today('yyyy-mm-dd') %> */\n'
            },
            buildsrc: { //按照原来的目录结构压缩所有JS文件
                options: {
                    mangle: false,
                    // {
                    //     except: ['_', '$', 'jQuery', 'jquery','angular','$scope', '$element', '$attrs','$state','require','define','echarts']
                    // }
                    compress: {
                        drop_console: true
                    },
                    report: 'min' //输出压缩率，可选的值有 false(不输出信息)，gzip
                },
                files: [{
                    expand: true,
                    cwd: '<%= pkg.appPath %>', //进入app目录
                    src: '**/*js', //压缩此目录下的所有文件
                    dest: 'dist/app' //输出到此目录下
                }]
            }
        },
        cssmin: {
            css_all: {
                expand: true,
                cwd: '<%= pkg.appPath %>',
                src: ['**/*css'],
                dest: 'dist/app'
            }
        },
        htmlmin: {
            html_all: {
                expand: true,
                cwd: '<%= pkg.appPath %>',
                src: ['**/*.html'],
                dest: 'dist/app'
            }
        },
        watch: {
            js: {
                files: ['src/**/*.js'],
                tasks: ['uglify:buildsrc','jshint:all', 'jscs:all'],
                options: {
                    spawn: true,
                    interrupt: true,
                    livereload: '<%= connect.options.livereload %>'
                }
            },
          livereload: {
            options: {
              livereload: '<%= connect.options.livereload %>'
            },
            files: [
              'src/**/*'
            ]
          }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-jscs');

    grunt.registerTask('serve', 'Compile then start a connect web server', function () {
      grunt.task.run([
        'connect:livereload',
        'watch'
      ]);
    });

    grunt.registerTask('default', ['clean', 'uglify:buildsrc', 'cssmin', 'htmlmin', 'copy']);
};
