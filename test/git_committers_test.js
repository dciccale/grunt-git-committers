'use strict';

var grunt = require('grunt');

exports.git_committers = {
  committers: function (test) {
    test.expect(1);
    var _ = grunt.util._;
    var actual = _.trim(grunt.file.read('AUTHORS.txt'));
    var expected = _.trim(grunt.file.read('test/expected/AUTHORS.txt'));
    test.equal(actual, expected, 'should create a file containing the committers for this git repository');
    test.done();
  }
};
