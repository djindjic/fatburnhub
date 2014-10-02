var fs             = require('fs'),
    gulp           = require('gulp'),
    del            = require('del'),
    mainBowerFiles = require('main-bower-files'),
    connect        = require('gulp-connect'),
    url            = require('url'),
    proxy          = require('proxy-middleware'),
    $              = require('gulp-load-plugins')();

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

var bowerFiles = {
  scripts: function() {
    var fileRegEx = (/.*\.js$/i);
    var files = mainBowerFiles({filter: fileRegEx});
    return files;
  },
  styles: function() {
    var fileRegEx = (/.*\.css$/i);
    var files = mainBowerFiles({filter: fileRegEx});
    return files;
  },
  fonts: function() {
    var fileRegEx = (/.*\.(?:eot|woff|ttf|svg)$/i);
    var files = mainBowerFiles({filter: fileRegEx});
    return files;
  }
}


gulp.task('connect', function(){
  connect.server({
    root: ['./builds/development'],
    port: 9000,
    livereload: true,
    middleware: function(connect, o) {
      return [ (function() {
          var options = url.parse('http://localhost:3000');
          options.route = '/api/';
          return proxy(options);
      })() ];
    }
  });
});

gulp.task('connect-production', function(){
  connect.server({
    root: ['./builds/production'],
    port: 9001,
    livereload: true,
    middleware: function(connect, o) {
      return [ (function() {
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
    .pipe($.htmlmin({
      collapseWhitespace: true,
      conservativeCollapse: true,
      minifyJS: true,
      minifyCSS: true,
      useShortDoctype: true,
      removeEmptyAttributes: true,
      removeComments: true
    }))
    .pipe(gulp.dest('./builds/production'))
    .pipe(connect.reload());
});

gulp.task('scripts', function() {
  return gulp.src(['app/config.js', 'app/app.js', 'app/**/*module.js', 'app/**/config/*.js', 'app/**/*.js'])
    .pipe($.sourcemaps.init())
      .pipe($.jshint())
      .pipe($.jshint.reporter('default'))
      .pipe($.concat('app.js'))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('./builds/development/scripts'))
    .pipe($.uglify())
    .pipe(gulp.dest('./builds/production/scripts'))
    .pipe(connect.reload());
});

gulp.task('styles', function() {
  return gulp.src(['app/**/styles/*.css'])
    .pipe($.sourcemaps.init())
      .pipe($.concat('app.css'))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('./builds/development/styles'))
    .pipe($.minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(gulp.dest('./builds/production/styles'))
    .pipe(connect.reload());
});

gulp.task('fonts', function() {
  return gulp.src(['app/**/fonts/*'])
    .pipe(gulp.dest('./builds/development/fonts'))
    .pipe(gulp.dest('./builds/production/fonts'))
    .pipe(connect.reload());
});

gulp.task('vendor-scripts', function() {
  return gulp.src(['vendor/**/*.js'].concat(bowerFiles.scripts()))
    .pipe($.concat('lib.js'))
    .pipe(gulp.dest('./builds/development/scripts'))
    .pipe($.uglify())
    .pipe(gulp.dest('./builds/production/scripts'))
    .pipe(connect.reload());
});

gulp.task('vendor-styles', function() {
  return gulp.src(['vendor/**/styles/*'].concat(bowerFiles.styles()))
    .pipe($.concat('lib.css'))
    .pipe($.minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(gulp.dest('./builds/development/styles'))
    .pipe(gulp.dest('./builds/production/styles'))
    .pipe(connect.reload());
});

gulp.task('vendor-fonts', function() {
  return gulp.src(['vendor/**/fonts/*'].concat(bowerFiles.fonts()))
    .pipe(gulp.dest('./builds/development/fonts'))
    .pipe(gulp.dest('./builds/production/fonts'))
    .pipe(connect.reload());
});

gulp.task('templates', function () {
    getModules().forEach(function(module) {
        gulp.src('app/**/templates/*.html')
            .pipe($.htmlmin({
              collapseWhitespace: true,
              conservativeCollapse: true,
              minifyJS: true,
              minifyCSS: true,
              useShortDoctype: true,
              removeEmptyAttributes: true,
              removeComments: true
            }))
            .pipe($.angularTemplatecache({
                module: module,
                base: function(file) {
                    var splitPath = file.relative.split('/');
                    return splitPath[splitPath.length - 1];
                }
              }))
            .pipe(gulp.dest('./builds/development/scripts'))
            .pipe($.uglify())
            .pipe(gulp.dest('./builds/production/scripts'))
            .pipe(connect.reload());
    })
});

gulp.task('watch', function () {
  gulp.watch(['./app/*.html'], ['html']);
  gulp.watch(['./app/**/templates/*.html'], ['templates']);
  gulp.watch(['./app/**/*.js'], ['scripts']);
  gulp.watch(['./app/**/*.css'], ['styles']);
  gulp.watch(['./app/**/fonts/*'], ['fonts']);
  gulp.watch(['./bower.json'], ['vendor-scripts', 'vendor-styles', 'vendor-fonts']);
});

gulp.task('clean', function () {
  del([
    'builds'
  ]);
});

gulp.task('default', ['connect', 'connect-production', 'watch', 'vendor-scripts', 'vendor-fonts', 'vendor-styles', 'scripts', 'styles', 'fonts', 'html', 'templates']);