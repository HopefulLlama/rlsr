var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jasmine = require('gulp-jasmine');
var coverage = require('gulp-coverage');

gulp.task('default', ['test']);
gulp.task('test', ['lint', 'unit-coverage']);

gulp.task('lint', function() {
  return gulp.src([
    'src/**/*.js',
    'spec/**/*.js',
  ])
  .pipe(jshint())
  .pipe(jshint.reporter('default'))
  .pipe(jshint.reporter('fail'));
});

gulp.task('unit-test', function() {
  return gulp.src('spec/unit/**/*.js')
  .pipe(jasmine());
});

gulp.task('unit-coverage', function() {
  return gulp.src('spec/unit/**/*.js')
  .pipe(coverage.instrument({
    pattern: ['src/**/*.js']
  }))
  .pipe(jasmine())
  .pipe(coverage.gather())
  .pipe(coverage.format())
  .pipe(gulp.dest('reports/unit'));
});