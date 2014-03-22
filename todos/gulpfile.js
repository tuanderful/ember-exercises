var gulp = require('gulp');


// include plug-ins
var jshint = require('gulp-jshint');
var EXPRESS_PORT = 4000;
var EXPRESS_ROOT = __dirname + '/src';
var LIVERELOAD_PORT = 35729;


// Livereload
// http://rhumaric.com/2014/01/livereload-magic-gulp-style/
// -----------------------------------------------------------------------------

// We'll need a reference to the tinylr object to send notifications of file changes
var lr;
function startLivereload() {
  lr = require('tiny-lr')();
  lr.listen(LIVERELOAD_PORT);
}


// Notifies livereload of changes detected
// by `gulp.watch()` 
function notifyLivereload(event) {
  // `gulp.watch()` events provide an absolute path
  // so we need to make it relative to the server root
  var fileName = require('path').relative(EXPRESS_ROOT, event.path);
 
  lr.changed({
    body: {
      files: [fileName]
    }
  });
}

// Express Server
// ------------------------------------
function startExpress() {
  var express = require('express');
  var app = express();
  app.use(require('connect-livereload')());     // Middleware to inject livereload JS snippet
  app.use(express.static(EXPRESS_ROOT));
  app.listen(EXPRESS_PORT);
}


// Gulp Tasks
// -----------------------------------------------------------------------------

gulp.task('jshint', function() {
  gulp.src('./src/scripts/*.js')
      .pipe(jshint())
      .pipe(jshint.reported('default'));
});

gulp.task('default', function() {
  // place code for your default task here
  startExpress();
  startLivereload();
  gulp.watch('src/**/*', notifyLivereload);
  console.log('gulp and running');
});