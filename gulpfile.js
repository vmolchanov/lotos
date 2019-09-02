const gulp = require('gulp');
const browserSync = require("browser-sync").create();

const scripts = require('./gulp-tasks/scripts');
const styles = require('./gulp-tasks/styles');
const images = require('./gulp-tasks/images');
const templates = require('./gulp-tasks/templates');

gulp.task('templates', templates);

gulp.task('scripts', scripts);

gulp.task('styles', styles);

gulp.task('images', images);

gulp.task('serve', () => {
    browserSync.init({
        server: './build'
    });

    gulp.watch('./src/templates/**/*.jade', gulp.series('templates-watch'));
    gulp.watch('./src/scss/**/*.scss', gulp.series('styles-watch'));
    gulp.watch('./src/js/**/*.js', gulp.series('scripts-watch'));
});

const watcher = {
    'templates-watch': ['templates'],
    'styles-watch': ['styles'],
    'scripts-watch': ['scripts']
};

Object.keys(watcher).forEach((name) => {
    gulp.task(name, gulp.series(...watcher[name]), (done) => {
        browserSync.reload();
        done();
    });
});