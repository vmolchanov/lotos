const gulp = require('gulp');
const browserSync = require('./gulp-tasks/browser-sync');

const scripts = require('./gulp-tasks/scripts');
const styles = require('./gulp-tasks/styles');
const images = require('./gulp-tasks/images');
const templates = require('./gulp-tasks/templates');

gulp.task('templates', templates);

gulp.task('scripts', scripts);

gulp.task('styles', styles);

gulp.task('images', images);

gulp.task('reload', (done) => {
    browserSync.reload();
    done();
});

gulp.task('watch', () => {
    browserSync.init({
        server: 'build'
    });

    gulp.watch('./src/templates/**/*.jade', gulp.series('templates', 'reload'));
    gulp.watch('./src/styles/**/*.scss', gulp.series('styles', 'reload'));
    gulp.watch('./src/scripts/**/*.js', gulp.series('scripts', 'reload'));
});