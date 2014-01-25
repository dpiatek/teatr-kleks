module.exports = function(grunt) {

  // Config
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    watch: {
      src: {
        files: ['js/**/*.js', 'css/**/*.scss'],
        tasks: ['jshint', 'sass'],
        options: {
          livereload: true
        }
      }
    },

    jshint: {
      src: [
        'js/**/*.js',
        'Gruntfile.js'
      ]
    },

    sass: {
      src: {
        files: {
          'css/main.css': 'css/main.scss'
        }
      },
      build: {
        options: {
          style: 'compressed'
        },
        files: {
          'build/css/main.css': 'css/main.scss'
        }
      }
    },

    preprocess: {
      build: {
        src: 'index.html',
        options: {
          inline: true,
          context: {
            APP_DEV: false
          }
        }
      }
    },

    copy: {
      main: {
        src: ['index.html'],
        dest: 'build/'
      },
      js: {
        expand: true,
        flatten: true,
        src: [
          'bower_components/jquery/jquery.min.js'
        ],
        dest: 'build/js/vendor/'
      }
    },

    imagemin: {
      dynamic: {
        files: [{
          expand: true,
          cwd: 'img/',
          src: ['*.{png,jpg,gif}'],
          dest: 'build/img/'
        }]
      }
    },

    concat: {
      build: {
        src: [
          'bower_components/handlebars/handlebars.min.js',
          'js/main.js'
        ],
        dest: 'build/js/main.js'
      }
    },

    clean: ['build']

  });

  // Load plugins
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.loadNpmTasks('grunt-preprocess');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-concat');

  // Tasks
  grunt.registerTask('default', ['watch']);
  grunt.registerTask('build', [
    'clean',
    'copy',
    'preprocess:build',
    'imagemin',
    'concat',
    'sass:build'
  ]);

};
