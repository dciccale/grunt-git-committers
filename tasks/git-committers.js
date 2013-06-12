/*
 * grunt-git-committers
 * https://github.com/dciccale/grunt-git-committers
 *
 * Copyright (c) 2013 Denis Ciccale
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

  var _ = grunt.util._;
  var exec = require('child_process').exec;

  grunt.registerTask('committers', 'Get the committers from a git repository with some sorting and formatting options', function () {
    var options = this.options({
      sort: 'chronological', // alphabetical, commits
      email: false, // show emails in the output
      nomerges: false, // only works when sorting by commits
      output: './AUTHORS.txt' // the output file
    });

    var done = this.async();

    // trim output
    var _trim = function (stdout) {
      return stdout.split('\n').map(function (l) {
        // trim and replace tabs for spaces
        return _.trim(l.replace(/\t+/, ' '));
      });
    };

    // sort types
    var sorts = {
      commits: '',
      alphabetical: 'sort',
      chronological: 'reverse'
    };

    // sort output
    var _sort = function (stdout) {
      if (sorts[options.sort]) {
        stdout = _.unique(stdout[sorts[options.sort]]());
      }
      return stdout;
    };

    // default command 'git'
    var cmd = 'git';

    if (options.sort === 'chronological' || options.sort === 'alphabetical') {
      cmd += ' log --pretty="%aN';

      // show email
      if (options.email) {
        cmd += ' <%aE>';
      }

      cmd += '"';

    // sort by number of commits
    } else if (options.sort === 'commits') {
      cmd += ' shortlog -ns';

      // show email
      if (options.email) {
        cmd += 'e';
      }

      // ommit merge commits
      if (options.nomerges) {
        cmd += ' --no-merges';
      }

      cmd += ' < /dev/tty';
    }

    exec(cmd, function (error, stdout, stderr) {
      if (!error) {
        stdout = _trim(stdout);
        stdout = _sort(stdout).join('\n').replace(/^\s+|\s+$/g, '');
        grunt.file.write(options.output, stdout);
        grunt.log.writeln('File "' + options.output + '" created.');
        done();
      } else {
        grunt.fail.warn(error);
      }
    });
  });
};
