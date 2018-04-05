var gulp = require('gulp'),
    sass = require('gulp-sass'),
    concatCss = require('gulp-concat-css'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    uncss = require('gulp-uncss'),
    prefixer = require('gulp-autoprefixer'),
    minifyCSS = require('gulp-minify-css'),
    connect = require('gulp-connect'),
    browserSync  = require('browser-sync').create(),
    del = require('del'),
    uglify = require('gulp-uglify'),
    order = require("gulp-order"),
    imagemin = require('gulp-imagemin'),
    cache = require('gulp-cache'),
    merge = require('merge-stream');

gulp.task('browser-sync',/* ['styles', 'scripts'],*/ function() {
  browserSync.init({
    server: {
      baseDir: "dist/"
    }
  });
});

gulp.task('css', function () {
  return gulp.src('app/css/*.css')
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());
});

gulp.task('scss', function () {
  return gulp.src('app/scss/main.scss')
    .pipe(sass())
    .pipe(concatCss('./style.css'))
    .pipe(prefixer({
      browsers: ['last 10 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('dist/css/'))
    .pipe(browserSync.stream());
});

gulp.task('js', function() {
  return gulp.src('app/js/**/*.js')
    .pipe(order([
        'view.js',
        'model.js',
        'controller.js',
        'game.js'
    ]))
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest('dist/js/'))
//    .pipe(rename('scripts.min.js'))
//    .pipe(uglify())
//    .pipe(gulp.dest('dist/js'))
    .pipe(browserSync.stream());
});

//html
gulp.task('html', function() {
  gulp.src('dist/*.html')
    .pipe(browserSync.stream());
});

//images
gulp.task('img', function(){
  return gulp.src('app/img/**/*.+(png|jpg|jpeg|gif|svg)')
  .pipe(cache(imagemin({
    interlaced: true
  })))
  .pipe(gulp.dest('dist/images/'))
});

gulp.task('watch', function() {
  gulp.watch('app/css/*.css', ['css']);
  gulp.watch('app/scss/**/*.scss', ['scss']);
  gulp.watch('dist/*.html', ['html']);
  gulp.watch('app/js/*.js', ['js']);
  gulp.watch('*.php').on('change', browserSync.reload);
});

gulp.task('clean', function(callback){
  del(['css/style.css', 'dist/js/**/*.js', '!dist/img', '!dist/*.html', '!dist/css/*', '!dist/css',  '!dist/img/**/*', '!dist/fonts', '!dist/fonts/**/*'], callback);
  return cache.clearAll(callback);
});

gulp.task('files', ['css', 'img', 'js', 'scss']);
gulp.task('run', ['browser-sync', 'js', 'scss', 'watch']);