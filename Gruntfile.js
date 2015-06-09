module.exports = function(grunt) {
  'use strict';

  var banner = '/*!\n' +
    ' * jQuery ADA Validation Plugin v<%= pkg.version %>\n' +
    ' *\n' +
    ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.company %>\n' +
    ' * Released under the <%= _.pluck(pkg.licenses, "type").join(", ") %> license\n' +
    ' */\n';

  var jsBanner = '(function ($, window, document, undefined) {\n  "use strict";\n\n';
  var jsFooter = '\n\n})(jQuery, window, document);';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      // Used to copy to dist folder
      dist: {
        options: {
          banner: banner + jsBanner,
          footer: jsFooter
        },
        files: {
          'dist/jquery.ada-validate.js': [
            'src/common.js',
            'src/Validator.js',
            'src/ValidatedInput.js',
            'src/ValidatedForm.js',
            'src/base-validations.js'
          ]
        }
      }
    },
    uglify: {
      options: {
        preserveComments: false,
        banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
          '<%= grunt.template.today("m/d/yyyy") %>\n' +
          ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.company %>;' +
          ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n'
      },
      dist: {
        files: {
          'dist/jquery.ada-validate.min.js': 'dist/jquery.ada-validate.js'
        }
      }
    },
    jshint: {
      options: {
        jshintrc: true
      },
      core: {
        src: 'src/**/*.js'
      },
      grunt: {
        src: 'Gruntfile.js'
      },
      test: {
        src: 'test/**/*.js'
      }
    },
    watch: {
      options: {
        atBegin: true
      },
      src: {
        files: '<%= jshint.core.src %>',
        tasks: [
          'concat'
        ]
      }
    },
    jscs: {
      options: {
        config: '.jscsrc'
      },
      all: [
        '<%= jshint.core.src %>',
        '<%= jshint.grunt.src %>',
        '<%= jshint.test.src %>'
      ]
    },
    replace: {
      dist: {
        src: 'dist/**/*.min.js',
        overwrite: true,
        replacements: [
          {
            from: './jquery.ada-validate',
            to: './jquery.ada-validate.min'
          }
        ]
      }
    },
    karma: {
      unit: {
        configFile: 'karma.conf.js'
      }
    },
    casperjs: {
      files: ['test/e2e/**/*.js']
    },
    version: {
      options: {
        prefix: '\\.VERSION\\s*=\\s*[\']'
      },
      defaults: {
        src: [
          'src/ValidatedInput.js',
          'src/ValidatedForm.js'
        ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-casperjs');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-jscs');
  grunt.loadNpmTasks('grunt-text-replace');
  grunt.loadNpmTasks('grunt-version');

  grunt.registerTask('test', ['casperjs', 'karma']);
  grunt.registerTask('default', ['concat', 'jscs', 'jshint', 'test']);
  grunt.registerTask('release', ['version', 'default', 'uglify', 'replace']);
  grunt.registerTask('start', ['concat', 'watch']);
};
