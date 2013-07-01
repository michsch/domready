module.exports = function(grunt) {
  "use strict";

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    meta: {
      banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") + "\\n" %>' +
        '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
        ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n'
    },
    clean: {
      compile: [
        'src/*.js',
        '**/*.map'
      ],
      dist: [
        'src/*.js',
        '**/*.map',
        '**/*.min.js'
      ]
    },
    coffee: {
      options: {
        bare: true
      },
      all: {
        expand: true,
        cwd: 'coffee/',
        src: [
          '**/*.coffee',
          '!**/_nu/**/*.coffee'
        ],
        dest: 'src/',
        rename: function( destPath, srcPath ) {
          var dest;
          dest = destPath + srcPath.replace(/\.coffee$/,".js");
          return dest;
        },
        //ext: '.js',
        options: {
          sourceMap: false
        }
      }
    },
    jshint : {
      options : {
        jshintrc: '.jshintrc'
      },
      gruntfile : {
        options : {
          jshintrc: '.jshintrc'
        },
        src : [ 'Gruntfile.js' ]
      },
      main : [
        'src/*.js'
      ],
      tests : {
        options : {
          jshintrc: 'tests/.jshintrc'
        },
        src : [ 'tests/*.js' ]
      }
    },
    qunit: {
      all: [ 'tests/domassistant-domready.html' ]
    },
    uglify: {
      dist: {
        options : {
          banner: '<%= meta.banner %>'
        },
        files: [
          {
            expand: true,
            cwd: 'src/',
            src: [ '*.js' ],
            dest: 'dist/',
            filter: 'isFile'
          }
        ]
      }
    },
    watch: {
      compile: {
        files: [
          'Gruntfile.js',
          'coffee/**/*.coffee',
          'tests/*.js'
        ],
        tasks: 'compile'
      }
    }
  });

  grunt.loadNpmTasks( 'grunt-contrib-clean' );
  grunt.loadNpmTasks( 'grunt-contrib-coffee' );
  grunt.loadNpmTasks( 'grunt-contrib-jshint' );
  grunt.loadNpmTasks( 'grunt-contrib-qunit' );
  grunt.loadNpmTasks( 'grunt-contrib-uglify' );
  grunt.loadNpmTasks( 'grunt-contrib-watch' );

  grunt.registerTask( 'compile', [ 'clean:compile', 'coffee', 'jshint' ]);
  grunt.registerTask( 'dist', [ 'clean:dist', 'coffee', 'jshint', 'qunit', 'uglify' ]);

  grunt.registerTask( 'default', 'watch:compile' );
};
