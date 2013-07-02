# grunt-git-committers
# https://github.com/dciccale/grunt-git-committers
# Copyright (c) 2013 Denis Ciccale (@tdecs)
# Licensed under the MIT license.
# https://github.com/dciccale/grunt-git-committers/blob/master/LICENSE-MIT

'use strict'

module.exports = ->

  @initConfig
    jshint:
      options:
        jshintrc: '.jshintrc'
      all: ['tasks/*.js', '<%= nodeunit.tests %>']

    nodeunit:
      tests: ['test/*_test.js']

  @loadTasks 'tasks'
  @loadNpmTasks 'grunt-contrib-jshint'
  @loadNpmTasks 'grunt-contrib-nodeunit'

  @registerTask 'test', ['committers', 'nodeunit']
  @registerTask 'default', ['jshint', 'test']
