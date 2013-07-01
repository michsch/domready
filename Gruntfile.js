module.exports = function(grunt) {
  "use strict";

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    meta: {
      banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") + "\\n" %>' +
        '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
        '*/\n',
      domassistant: '/*! DOMAssistant.DOMLoad\n' +
        '* found here: https://code.google.com/p/domassistant/source/browse/trunk/modules/DOMAssistantLoad.js\n' +
        '* Developed by Robert Nyman/DOMAssistant team,\n' +
        '* code/licensing: http://domassistant.googlecode.com/\n' +
        '*/\n',
      freelancephp: '/*! @author Victor Villaverde Laan\n' +
        '* @license MIT\n' +
        '* @link http://www.freelancephp.net/domready-javascript-object-cross-browser/\n' +
        '* @link https://github.com/freelancephp/DOMReady\n' +
        '*/\n',
      requirejs: '/*! RequireJS domReady\n' +
        '* with AMD wrapper so you can use it without RequireJS\n' +
        '* @license RequireJS domReady 2.0.1 Copyright (c) 2010-2012, The Dojo Foundation All Rights Reserved.\n' +
        '* Available via the MIT or new BSD license.\n' +
        '* see: http://github.com/requirejs/domReady for details\n' +
        '*/\n'
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
      all: [ 'tests/*.html' ]
    },
    uglify: {
      domassistant: {
        options : {
          banner: '<%= meta.banner %>\n<%= meta.domassistant %>'
        },
        files: [
          {
            src: [ 'src/domassistant-domready.js' ],
            dest: 'dist/domassistant-domready.min.js'
          }
        ]
      },
      freelancephp: {
        options : {
          banner: '<%= meta.banner %>\n<%= meta.freelancephp %>'
        },
        files: [
          {
            src: [ 'src/freelancephp-domready.js' ],
            dest: 'dist/freelancephp-domready.min.js'
          }
        ]
      },
      requirejs: {
        options : {
          banner: '<%= meta.banner %>\n<%= meta.requirejs %>'
        },
        files: [
          {
            src: [ 'src/requirejs-domready.js' ],
            dest: 'dist/requirejs-domready.min.js'
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
