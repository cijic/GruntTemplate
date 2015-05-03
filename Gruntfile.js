module.exports = function(grunt) {

    var subFolder = 'release/';

    // 1. Вся настройка находится здесь
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {
            dist: {
                src: [
                    'js/libs/*.js',
                    'js/dev/script.js'
                ],
                dest: subFolder + 'js/production.min.js',
            }
        },

        uglify: {
            build: {
                src:  subFolder + 'js/production.min.js',
                dest: subFolder + 'js/production.min.js'
            }
        },

        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'img/',
                    src: ['**/*.{png,jpg,gif,ico}'],
                    dest: subFolder + 'img/'
                }]
            }
        },

        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: 'css',
                    src: ['*.css', '!*.min.css'],
                    dest: subFolder + 'css',
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