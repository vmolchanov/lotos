const gulp = require('gulp');
const jade = require('gulp-jade');
const prettify = require('gulp-prettify');
const typograf = require('gulp-typograf');
const browserSync = require('./browser-sync');

module.exports = () => {
    return gulp
        .src('src/templates/**/*.jade')
        .pipe(jade({
            pretty: true
        }))
        .on('error', function(e) {
            console.log(`Error: ${e}`);
            console.log(`Filename: ${e.filename}`);
            console.log(`Message: ${e.msg}`);
            console.log(`Path: ${e.message}`);
        })
        .on('error', function() {
            this.emit('end');
        })
        .pipe(typograf({
            locale: ['ru']
        }))
        .pipe(prettify({
            indent_size: 4,
            unformatted: ['sub', 'sup']
        }))
        .pipe(gulp.dest('build'))
        .pipe(browserSync.stream());
};