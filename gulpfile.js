'use strict';

const autoprefixer = require('gulp-autoprefixer');
const cleancss = require('gulp-cleancss');
const concat = require('gulp-concat');
const fs = require('fs');
const gulp = require('gulp');
//const gzip = require('gulp-gzip');
const less = require('gulp-less');
const rename = require('gulp-rename');

const apBrowsers = {
    browsers: ['ie >= 11', 'Firefox >= 36', 'Chrome >= 36', 'iOS >= 6', 'Safari >= 6', 'Android > 4.0']
};

gulp.task('jquery',function() {
    gulp.src('./node_modules/jquery/dist/jquery.min.js')
        .pipe(rename('jquery.js'))
        .pipe(gulp.dest('./src/js'))
});

gulp.task('css',function() {
    gulp.src('./src/less/*')
        .pipe(concat('main.css'))
        .pipe(less())
        .pipe(autoprefixer(apBrowsers))
        .pipe(cleancss())
        .pipe(gulp.dest('./css'))
});

gulp.task('compress-js', ['jquery'], function() {
    gulp.src('./src/js/**')
        //.pipe(gzip())
        .pipe(gulp.dest('./js'));
});

gulp.task('default', [
    'jquery',
    'compress-js',
    'css'
]);
