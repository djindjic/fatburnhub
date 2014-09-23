var fs         = require('fs'),
    gulp       = require('gulp'),
    connect    = require('gulp-connect'),
    plugins    = require('gulp-load-plugins')();

function getModules() {
  var rootDir = './app/modules';
  var dirs, file, filePath, files, stat, _i, _len;
  files = fs.readdirSync(rootDir);
  dirs = [];
  for (_i = 0, _len = files.length; _i < _len; _i++) {
    file = files[_i];
    if (file[0] !== '.') {
      filePath = "" + rootDir + "/" + file;
      stat = fs.statSync(filePath);
      if (stat.isDirectory()) {
        dirs.push(file);
      }
    }
  }
  return dirs;
};

gulp.task('connect', function(){
  connect.server({
    root: ['./builds/development'],
    port: 9000,
    livereload: true,
    middleware: function(connect, o) {
      return [ (function() {
          var url = require('url');
          var proxy = require('proxy-middleware');
          var options = url.parse('http://localhost:3000');
          options.route = '/api/';
          return proxy(options);
      })() ];
    }
  });
});

gulp.task('html', function () {
  return gulp.src('./app/*.html')
    .pipe(gulp.dest('./builds/development'))
    .pipe(plugins.htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('./builds/production'))
    .pipe(connect.reload());
});

gulp.task('scripts', function() {
  return gulp.src('app/**/*.js')
    .pipe(plugins.concat('app.js'))
    .pipe(gulp.dest('./builds/development/scripts'))
    .pipe(connect.reload());
});

gulp.task('vendor', function() {
  return gulp.src('vendor/**/*.js')
    .pipe(plugins.concat('vendor.js'))
    .pipe(gulp.dest('./builds/development/scripts'));
});

gulp.task('views', function () {
    getModules().forEach(function(module) {
        gulp.src('app/**/views/*.html')
            .pipe(plugins.angularTemplatecache({
              module: module
            }))
            .pipe(gulp.dest('./builds/development/scripts'))
            .pipe(connect.reload());
    })
});

gulp.task('watch', function () {
  gulp.watch(['./app/*.html'], ['html']);
  gulp.watch(['./app/**/views/*.html'], ['views']);
  gulp.watch(['./app/*.js'], ['scripts']);
});

gulp.task('default', ['connect', 'watch', 'vendor', 'scripts', 'html', 'views']);