module.exports = function(grunt) {

    var assetsFolder = 'assets/';
    var releaseFolder = 'release/';

    // 1. Вся настройка находится здесь
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {
            dist: {
                src: [
                    assetsFolder + 'js/libs/*.js',
                    assetsFolder + 'js/dev/script.js'
                ],
                dest: releaseFolder + 'js/production.min.js',
            }
        },

        uglify: {
            build: {
                src:  releaseFolder + 'js/production.min.js',
                dest: releaseFolder + 'js/production.min.js'
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
            target: {
                files: [{
                    expand: true,
                    cwd: assetsFolder + 'css',
                    src: ['*.css', '!*.min.css'],
                    dest: releaseFolder + 'css',
                    ext: '.min.css'
                }]
            }
        }
    });

    // 3. Тут мы указываем Grunt, что хотим использовать этот плагин
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    // 4. Указываем, какие задачи выполняются, когда мы вводим «grunt» в терминале
    grunt.registerTask('default', ['concat', 'uglify', 'imagemin', 'cssmin']);
};