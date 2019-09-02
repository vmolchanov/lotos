const gulp = require('gulp');
const jade = require('gulp-jade');
const changed = require('gulp-changed');
const prettify = require('gulp-prettify');
const typograf = require('gulp-typograf');
const browserSync = require('./browser-sync');

// module.exports = () => {
//     const locals = {};
 
//     return gulp
//         .src('src/templates/**/*.jade')
//         .pipe(jade({
//             locals
//         }))
//         .pipe(gulp.dest('./build'));
// };

module.exports = () => {
    return gulp
        .src('src/templates/**/*.jade')
        .pipe(changed('build', {extension: '.html'}))
        .pipe(jade({
            pretty: true
        }))
        .on('error', function(e) {
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
        // .pipe(browserSync.stream());
};