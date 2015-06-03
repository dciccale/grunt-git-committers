/*
 * grunt-git-committers
 * https://github.com/dciccale/grunt-git-committers
 *
 * Copyright (c) 2013-2015 Denis Ciccale (@tdecs)
 * Licensed under the MIT license.
 * https://github.com/dciccale/grunt-git-committers/blob/master/LICENSE-MIT
 */

'use strict';

module.exports = function (grunt) {

  var gitCommitters = require('git-committers');

  grunt.registerTask('committers', 'Get the committers from a git repository with some sorting and formatting options', function () {
    var options = this.options({
      output: './AUTHORS.txt' // The output file
    });

    var done = this.async();

    gitCommitters(options, function (err, output) {
      if (err) {
        grunt.fail.warn(err);
      } else {
        grunt.file.write(options.output, output);
        grunt.log.writeln('File "' + options.output + '" created.');
        done();
      }
    });
  });
};
