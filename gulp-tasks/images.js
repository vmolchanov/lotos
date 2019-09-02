const gulp = require('gulp');
const imagemin = require('gulp-imagemin');

module.exports = () => {
    return gulp
        .src('./src/img/**/*.*')
        .pipe(imagemin())
        .pipe(gulp.dest('./build/img'));
};