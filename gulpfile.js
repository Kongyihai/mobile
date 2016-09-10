var gulp = require('gulp');
var stylus= require("gulp-stylus");

var paths = {
  stylus:['./dev/media/stylus/*.styl','./dev/em-rem/stylus/*.styl']
};

gulp.task('stylus-1', function() {
  return gulp.src(paths.stylus[0])
     .pipe(stylus({
      compress :1
     }))
    .pipe(gulp.dest('./pro/media/css'));
});

gulp.task('stylus-2', function() {
  return gulp.src(paths.stylus[1])
     .pipe(stylus({
      compress :1
     }))
    .pipe(gulp.dest('./pro/em-rem/css'));
});

gulp.task('watch', function() {
  gulp.watch(paths.stylus, ['stylus-1','stylus-2']);
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['watch','stylus-1','stylus-2']);