const gulp = require('gulp');
const jade = require('gulp-jade');

module.exports = () => {
    const locals = {};
 
    return gulp
        .src('./templates/**/*.jade')
        .pipe(jade({
            locals
        }))
        .pipe(gulp.dest('./build/'));
};