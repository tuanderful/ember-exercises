var gulp = require('gulp');

// include plug-ins
var jshint = require('gulp-jshint');

gulp.task('jshint', function() {
  gulp.src('./src/scripts/*.js')
      .pipe(jshint())
      .pipe(jshint.reported('default'));
});

gulp.task('default', function() {
  // place code for your default task here
});