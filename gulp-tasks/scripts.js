const gulp = require('gulp');
const rollup = require('gulp-rollup');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify-es').default;
const rename = require('gulp-rename');

module.exports = () => {
    return gulp
        .src('./src/scripts/**/*.js')
        .pipe(rollup({
            input: './src/scripts/main.js',
            format: 'es'
        }).on('error', (err) => console.error(err)))
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(rename('bundle.min.js'))
        .pipe(gulp.dest('./build/scripts'));
};