var Promise   = require('promise'),
    gulp      = require('gulp'),
    $         = require('gulp-load-plugins')();
    cachebust = new $.cachebust;

var startServer = function(){
  return new Promise(function (fulfil) {
    gulp.src('./www')
      .pipe($.webserver({
        port: 9000,
        livereload: true,
        fallback: 'index.html'
      }))
      .on('end', fulfil);
  });
};

gulp.task('default',
  function() {
    startServer();
  }
);

gulp.task('build-html', function () {
  return gulp.src('www/config.js')
      .pipe(cachebust.resources())
      .pipe(gulp.dest('www'));
});

gulp.task('bust-config', ['build-html'], function () {
  return gulp.src('www/index.html')
      .pipe(cachebust.references())
      .pipe(gulp.dest('www'));
});
