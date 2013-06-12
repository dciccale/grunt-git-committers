# grunt-git-committers [![NPM version](https://badge.fury.io/js/grunt-git-committers.png)](http://badge.fury.io/js/grunt-git-committers)

> Get the committers from a git repository with some sorting and formatting options.

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-git-committers --save-dev
```

One the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-git-committers');
```

## The "committers" task

Generate a list of committers for the current git repository.

### Options

#### options.sort
Type: `String`
Default value: `chronological`

The sort type. Could be one of `chronological`, `alphabetical` or `commits`.

#### options.email
Type: `Boolean`
Default value: `false`

Set to `true` to include the emails beside the committers.

#### options.nomerges
Type: `Boolean`
Default value: `false`

Set to `true` to exclude merge commits. It only works when sorting by `commits`.

#### options.ouput
Type: `String`
Default value: `./AUTHORS.txt`

The output file where to save the list of committers.

### Usage Examples

#### Default Options
If using the default options you don't need to specify anything at your gruntfile, just call the `committers` task.

#### Custom Options
This will save a file `CONTRIBUTIONS.md` with the list of committers and their emails, ordered by number of commits
(from top to bottom) without counting the merge commits.

```js
grunt.initConfig({
  committers: {
    options: {
      sort: 'commits',
      email: true,
      nomerges: true,
      output: 'CONTRIBUTIONS.md'
    },
  },
})
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
- 0.1.0 Initial release
