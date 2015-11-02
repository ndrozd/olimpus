var gulp          = require('gulp'),
    connect       = require('gulp-connect'),
    sass          = require('gulp-sass'),
    concat        = require('gulp-concat'),
    rename        = require('gulp-rename'),
    uglify        = require('gulp-uglify'),
    prefix        = require('gulp-autoprefixer'),
    minifyCSS     = require('gulp-minify-css'),
    autowatch     = require('gulp-autowatch'),
    haml          = require('gulp-haml'),
    plumber       = require('gulp-plumber'),
    svgstore      = require('gulp-svgstore'),
    svgmin        = require('gulp-svgmin'),
    replace       = require('gulp-replace'),
    changed       = require('gulp-changed'),
    ftp           = require('gulp-ftp'),
    // notify        = require("gulp-notify");
    prettify      = require('gulp-prettify');


// HTML

gulp.task('htmls', function () {
  gulp.src('web/*.html')
    .pipe(connect.reload());
});

// HAML 

gulp.task('hamls', function () {
  gulp.src('haml/*.haml')
    .pipe(changed('web', {extension: '.html'}))
    .pipe(plumber())
    .pipe(haml())
    .pipe(prettify({indent_size: 2}))
    // .pipe(prettify({indent_size: 2}))
    .pipe(gulp.dest('web'))

    // .pipe(ftp({
    //     host: '72.167.232.44',
    //     user: '',
    //     pass: '',
    //     remotePath: 'otkritie'
    // }))
    .pipe(connect.reload());
});

// SCSS

gulp.task('base-styles', function() {
  return gulp.src('scss/base/*.scss')
    .pipe(plumber())
    .pipe(concat('base.scss'))
    .pipe(sass())
    .pipe(prefix(["last 5 version", "ie 9", "ie 8"]))
    .pipe(minifyCSS({keepBreaks: true}))
    .pipe(gulp.dest('web/css'))
    // .pipe(ftp({
    //     host: '72.167.232.44',
    //     user: '',
    //     pass: '',
    //     remotePath: 'otkritie/css'
    // }))
    .pipe(connect.reload());
});

gulp.task('styles', function() {
  return gulp.src('scss/*.scss')
    .pipe(plumber())
    .pipe(concat('style.scss'))
    .pipe(sass())
    .pipe(prefix(["last 5 version", "ie 9", "ie 8"]))
    .pipe(minifyCSS({keepBreaks: true}))
    .pipe(gulp.dest('web/css'))
    // .pipe(ftp({
    //     host: '72.167.232.44',
    //     user: '',
    //     pass: '',
    //     remotePath: 'otkritie/css'
    // }))
    .pipe(connect.reload());
});

// JS

gulp.task('plugins', function() {
  return gulp.src('js/plugins/*.js')
    .pipe(plumber())
    .pipe(concat('plugins.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('web/js'))
    // .pipe(ftp({
    //     host: '72.167.232.44',
    //     user: '',
    //     pass: '',
    //     remotePath: 'otkritie/js'
    // }))
    .pipe(connect.reload());
});

gulp.task('scripts', function() {
  return gulp.src('js/*.js')
    .pipe(plumber())
    .pipe(concat('script.js'))
    .pipe(gulp.dest('web/js'))
    // .pipe(ftp({
    //     host: '72.167.232.44',
    //     user: '',
    //     pass: '',
    //     remotePath: 'otkritie/js'
    // }))
    .pipe(connect.reload());
});

gulp.task('svg', function () {
return gulp.src('web/images/sprite/*.svg')
  .pipe(replace(/NaN/g, '1'))
  .pipe(replace(/fill=\"(.*?)\"/g, ''))
  .pipe(svgmin())
  .pipe(svgstore({fileName: 'icons.svg', prefix: 'icon-', onlySvg: false}))
  // .pipe(ftp({
  //     host: '72.167.232.44',
  //     user: '',
  //     pass: '',
  //     remotePath: 'otkritie/images/svg/'
  // }))
  .pipe(gulp.dest('web/images/svg/'))
})

gulp.task('ftp', function () {
return gulp.src('web/**')
  .pipe(ftp({
      host: '72.167.232.44',
      user: '',
      pass: '',
      remotePath: 'otkritie/'
  }))
})

// WATCH

var paths = { 
  svg: 'web/images/sprite/*.svg',
  hamls:    'haml/*.haml',
  htmls:          'web/*.html',
  'base-styles':  'scss/base/*.scss',
  styles:         'scss/*.scss',
  plugins:        'js/plugins/*.js',
  scripts:        'js/*.js',
  // ftp: 'web/'
};

// gulp.task('ftp', function() {
//   return gulp.src('web/*')
    
// });
gulp.task('watch', function(cb) {
  autowatch(gulp, paths);
  return cb();
});

// LIVERELOAD 

gulp.task('connect', function() {
  connect.server({
    port: '3002',
    livereload: true,
  });
});

// DEFAULT

gulp.task('default',  [
  'connect',
  'hamls',
  'base-styles',
  'styles',
  'plugins',
  'scripts',
  'svg',
  // 'ftp',
  'watch'
]);