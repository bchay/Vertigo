module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    clean: {
      build: {
        src: ['build/**/*.*', '!build/stylesheets/bootstrap/**/*.*']
      },
      stylesheets: { //Removes all .css files, not minified versions
        src: ['build/stylesheets/*.css', '!build/stylesheets/*.min.css', '!build/stylesheets/bootstrap/**/*.*']
      },
      images: {
        src: ['build/images/*.*']
      },
      pug: {
        src: ['build/views/**/*.pug']
      },
      sheets: { //Removes all .css, .min.css, not bootstrap
        src: ['build/stylesheets/*.css', '!build/stylesheets/bootstrap/**/*.*']
      }
    },

    sass: {
      options: {
        sourcemap: 'none'
      },
      dist: {
        files: [{
          expand: true,
          cwd: 'src/stylesheets',
          src: ['*.scss'],
          dest: 'build/stylesheets',
          ext: '.css'
         }]
      }
    },

    postcss: {
      options: {
        map: true,
        processors: [
          require('autoprefixer')({
            browsers: ['last 5 versions']
          })
        ]
      },
      build: {
        src: 'build/stylesheets/*.css'
      }
    },

    cssmin: {
      target: {
        files: [{
            expand: true,
            cwd: 'build/stylesheets',
            src: ['*.css'],
            dest: 'build/stylesheets',
            ext: '.min.css'
        }]
      }
    },

    pug: {
      build: {
        files: [{
          expand: true,
          cwd: 'src/views',
          src: ['*.pug'],
          dest: 'build/views',
          ext: '.html'
        }]
      }
    },

    imagemin: {
      dynamic: {
        files: [{
          expand: true,
          cwd: 'src/images',
          src: ['*.{png,jpg,gif,jpeg,svg,ico}'],
          dest: 'build/images'
        }]
      }
    },

    watch: {
      stylesheets: {
        files: ['src/stylesheets/**/*.scss'],
        tasks: ['update-stylesheets']
      },
      pug: {
        files: ['src/views/**/*.pug'],
        tasks: ['update-pug']
      },
      images: {
        files: ['src/images/**/*.*'],
        tasks: ['clean:images', 'imagemin']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-pug');
  grunt.loadNpmTasks('grunt-contrib-imagemin');

  grunt.registerTask('default', ['clean:build', 'sass', 'postcss:build', 'cssmin', 'clean:stylesheets', 'pug:build', 'imagemin']);
  grunt.registerTask('update-stylesheets', ['clean:sheets', 'sass', 'postcss:build', 'cssmin', 'clean:stylesheets']);
  grunt.registerTask('update-pug', ['clean:pug', 'pug:build']);
};