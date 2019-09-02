const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const rename = require('gulp-rename');

sass.compiler = require('node-sass');

module.exports = () => {
    return gulp
        .src('./src/styles/style.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(rename('bundle.min.css'))
        .pipe(gulp.dest('./build/styles'));
};