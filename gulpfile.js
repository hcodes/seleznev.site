var gulp = require('gulp'),
    fs = require('fs'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    gzip = require('gulp-gzip');

gulp.task('jquery',function() {
    gulp.src('./node_modules/jquery/dist/jquery.min.js')
        .pipe(rename('jquery.js'))
        .pipe(gulp.dest('./src/js'))
});

gulp.task('css',function() {
    gulp.src('./src/css/*')
        .pipe(concat('main.css'))
        .pipe(gulp.dest('./css'))
});

gulp.task('compress-js', ['jquery'], function() {
    gulp.src('./src/js/**')
        .pipe(gzip())
        .pipe(gulp.dest('./js'));
});

gulp.task('default', [
    'jquery',
    'compress-js',
    'css'
]);
