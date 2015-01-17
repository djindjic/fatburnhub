var Promise = require('promise'),
    gulp    = require('gulp'),
    $       = require('gulp-load-plugins')();
    semver  = require('semver'),
    shell   = require('gulp-shell'),
    watch   = require('gulp-watch'),
    bump    = require('gulp-bump'),
    pkg     = require('./package.json');

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

gulp.task('deploy-master', function(){
  var newVer = semver.inc(pkg.version, 'patch');
  return gulp.src(['./package.json'])
    .pipe(bump({version: newVer}))
    .pipe(gulp.dest('./'))
    .on('end', shell.task([
            'git add --all',
            'git commit -m "' + newVer + '"', 
            'git tag v' + newVer,
            'git push origin master', 
            'git push origin --tags'
           ]));

});