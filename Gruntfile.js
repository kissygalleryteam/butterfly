module.exports = function(grunt) {
    grunt.initConfig({
        // 配置文件，参考package.json配置方式，必须设置项是
        // name, version, author
        // name作为gallery发布后的模块名
        // version是版本，也是发布目录
        // author必须是{name: "xxx", email: "xxx"}格式
        pkg: grunt.file.readJSON('abc.json'),
        banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
            '<%= grunt.template.today("yyyy-mm-dd h:MM:ss TT") %>\n' +
            '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
            '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
            ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',

        // kmc打包任务，默认情况，入口文件是index.js，可以自行添加入口文件，在files下面
        // 添加
        kmc: {
            options: {
                packages: [
                    {
                        name: '<%= pkg.name %>',
                        path: '../'
                    }
                ],
                map: [["<%= pkg.name %>/", "gallery/<%= pkg.name %>/"]]
            },
            main: {
                files: [
                    {
                        src: "<%= pkg.version %>/index.js",
                        dest: "<%= pkg.version %>/build/index.js"
                    },
                    {
                        src: "<%= pkg.version %>/plugin/ui/checkbox.js",
                        dest: "<%= pkg.version %>/build/plugin/ui/checkbox.js"
                    },
                    {
                        src: "<%= pkg.version %>/plugin/ui/radio.js",
                        dest: "<%= pkg.version %>/build/plugin/ui/radio.js"
                    },
                    {
                        src: "<%= pkg.version %>/plugin/ui/select.js",
                        dest: "<%= pkg.version %>/build/plugin/ui/select.js"
                    },
                    {
                        src: "<%= pkg.version %>/plugin/ui/text.js",
                        dest: "<%= pkg.version %>/build/plugin/ui/text.js"
                    },
                    {
                        src: "<%= pkg.version %>/plugin/ui/textarea.js",
                        dest: "<%= pkg.version %>/build/plugin/ui/textarea.js"
                    },
                    {
                        src: "<%= pkg.version %>/plugin/ui/uploader.js",
                        dest: "<%= pkg.version %>/build/plugin/ui/uploader.js"
                    },
                    {
                        src: "<%= pkg.version %>/plugin/ui/spinbox.js",
                        dest: "<%= pkg.version %>/build/plugin/ui/spinbox.js"
                    },
                    {
                        src: "<%= pkg.version %>/plugin/auth.js",
                        dest: "<%= pkg.version %>/build/plugin/auth.js"
                    },
                    {
                        src: "<%= pkg.version %>/plugin/bidi.js",
                        dest: "<%= pkg.version %>/build/plugin/bidi.js"
                    },
                    {
                        src: "<%= pkg.version %>/plugin/plugins.js",
                        dest: "<%= pkg.version %>/build/plugin/plugins.js"
                    }
                ]
            }
        },
        // 打包后压缩文件
        // 压缩文件和入口文件一一对应
        uglify: {
            options: {
                banner: '<%= banner %>',
                beautify: {
                    ascii_only: true
                }
            },
            base: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= pkg.version %>/build/',
                        src: ['**/*.js', '!**/*-min.js'],
                        dest: '<%= pkg.version %>/build/',
                        ext: '-min.js'
                    }
                ]
            }
        },
        copy: {
            main: {
                files: [
                    {src: ['<%= pkg.version %>/theme/default/style.css'], dest: '<%= pkg.version %>/build/theme/default/style.css'}
                ]
            }
        },
        cssmin: {
            combine: {
                files: {
                    '<%= pkg.version %>/build/theme/default/style-min.css': ['<%= pkg.version %>/build/theme/default/style.css']
                }
            }
        },
        coffee: {
            compile: {
                options: {
                    //去掉匿名函数包裹
                    bare:true
                },
                files:[
                    {
                        expand: true,
                        cwd: '<%= pkg.version %>',
                        src: ['**/*.coffee'],
                        dest: '<%= pkg.version %>',
                        ext: '.js'
                    }
                ]
            }

        },
        watch: {
            options: {
                spawn: false,
                livereload: true
            },
            scripts: {
                files: [ '<%= pkg.version %>/**/*.coffee' ],
                tasks: [ 'coffee']
            }
        }
    });

    // 使用到的任务，可以增加其他任务
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-kmc');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-coffee');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask('w',['watch:scripts']);
    grunt.registerTask('coff',['coffee']);
    grunt.event.on('watch', function(action, filepath, target) {
        grunt.log.writeln(target + ': ' + filepath + ' has ' + action);
    });
    return grunt.registerTask('default', ['kmc', 'uglify','copy','cssmin']);
};