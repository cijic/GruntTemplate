module.exports = function(grunt)
{
    var assetsFolder  = '../../www/laravel5/public/assets/';
    var releaseFolder = '../../www/laravel5/public/assets_min/';

    // 1. Вся настройка находится здесь
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            js: {
                src: [
                    releaseFolder + 'js/' + 'jquery.js',
                    releaseFolder + 'js/' + 'bootstrap.min.js',
                    releaseFolder + 'js/' + 'jssor.js',
                    releaseFolder + 'js/' + 'jssor.slider.js',
                    releaseFolder + 'js/' + 'internal.js'
                ],
                dest: releaseFolder + 'js/production.js',
            },
            css : {
                src: [
                    releaseFolder + 'css/bootstrap.css',
//                    releaseFolder + 'css/app.css',
//                    releaseFolder + 'css/admin.css',
                    releaseFolder + 'css/style.css'
                ],
                dest: releaseFolder + 'css/production.css'
            }
        },
        uglify: {
            my_target: {
                files: [{
                    expand: true,
                    cwd: assetsFolder + 'js',
                    src: '**/*.js',
                    dest: releaseFolder + 'js'
                }]
            }
        },
        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: assetsFolder + 'img/',
                    src: ['**/*.{png,jpg,gif,ico}'],
                    dest: releaseFolder + 'img/'
                }]
            }
        },
        cssmin: {
            options: {
                keepSpecialComments : 0
            },
            target: {
                files: [{
                    expand: true,
                    cwd: assetsFolder + 'css',
                    src: ['*.css'],
                    dest: releaseFolder + 'css'
                }]
            }
        },
        'ftp-deploy': {
            build: {
                auth: {
                    host: 'change_it',
                    port: 21,
                    authKey: 'change_it'
                },
                src: releaseFolder,
                dest: '/httpdocs/laravel5/public/assets_min/',
                exclusions: ['path/to/source/folder/**/.DS_Store', 'path/to/source/folder/**/Thumbs.db', 'path/to/dist/tmp']
            }
        },
        mkdir: {
            all: {
                options: {
                    create: [releaseFolder]
                },
            },
        },
        watch: {
            scripts: {
                files: [assetsFolder + 'js/*.js', assetsFolder + 'css/*.css'],
                tasks: ['mkdir', 'uglify', 'cssmin', 'concat'],
                options: {
                    spawn: false,
                },
            }
        }
    });

    // 3. Тут мы указываем Grunt, что хотим использовать этот плагин
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-ftp-deploy');
    grunt.loadNpmTasks('grunt-mkdir');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-concat-css');

    // 4. Указываем, какие задачи выполняются, когда мы вводим «grunt» в терминале
    grunt.registerTask('default', ['mkdir', 'uglify', 'cssmin', 'concat', 'imagemin']);
};