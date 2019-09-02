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

gulp.task('serve', () => {
    browserSync.init({
        server: 'build'
    });

    gulp.watch('./src/templates/**/*.jade', gulp.series('templates', 'reload'));
    gulp.watch('./src/scss/**/*.scss', gulp.series('styles', 'reload'));
    gulp.watch('./src/js/**/*.js', gulp.series('scripts', 'reload'));
});