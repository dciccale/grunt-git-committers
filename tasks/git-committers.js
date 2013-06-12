/*
 * grunt-git-committers
 * https://github.com/dciccale/grunt-git-committers
 *
 * Copyright (c) 2013 Denis Ciccale (@tdecs)
 * Licensed under the MIT license.
 * https://github.com/dciccale/grunt-git-committers/blob/master/LICENSE-MIT
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

    var _format = function (stdout) {
      var maxcol = 0;
      var pad = ' ';
      return stdout.replace(/^\s+|\s+$/g, '').split('\n').map(function (l) {
        var numl = l.match(/\d+/);
        if (numl) {
          numl = numl[0].length;
          maxcol = numl > maxcol ? numl : maxcol;
          pad = '  ' + new Array(maxcol-numl+1).join(' ');
        }
        return _.trim(l.replace(/\t+/, pad));
      });
    };

    // sort types
    var sortMethod = {
      alphabetical: 'sort',
      chronological: 'reverse'
    };

    // sort output
    var _sort = function (stdout) {
      if (sortMethod[options.sort]) {
        stdout = _.unique(stdout[sortMethod[options.sort]]());
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
        stdout = _format(stdout);
        stdout = _sort(stdout);
        grunt.file.write(options.output, stdout.join('\n'));
        grunt.log.writeln('File "' + options.output + '" created.');
        done();
      } else {
        grunt.fail.warn(error);
      }
    });
  });
};
