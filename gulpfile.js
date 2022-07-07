const gulp = require('gulp');
const del = require('del');
const usemin = require('gulp-usemin');
const uglify = require('gulp-uglify');
const cssmin = require('gulp-cssmin');
const webp = require('gulp-webp');
const replace = require('gulp-string-replace');
const { parallel } = require('gulp');

gulp.task('clean', async function () {
    return del([
        'dist/**/*'
    ])
})

gulp.task('copy', async function () {
    return gulp.src('src/**/*')
        .pipe(gulp.dest('dist'));
})

gulp.task('static-files', async function () {
    return gulp.src([
            'src/**/*',
            '!src/**/*.html',
            '!src/assets/css/**/*.css',
            '!src/assets/js/**/*.js',
            '!src/assets/imgs/**/*',
            'src/**/*favicon.png',])
            .pipe(gulp.dest('dist'));
})

gulp.task('usemin-replace', async function () {
    return gulp.src('src/**/*.html')
        .pipe(usemin({
            'js' : [uglify],
            'css' : [cssmin]
        }))
        .pipe(replace(/(\.(png|jpg|jpeg|tiff))+(?<!(favicon\.png|app_icon\.png))/g, '.webp'))
        .pipe(gulp.dest('dist'));
})

gulp.task('convert-webp', async function () {
    return gulp.src(['src/assets/imgs/*', '!src/assets/imgs/pwa/*', '!src/assets/imgs/favicon.png'])
        .pipe(webp())
        .pipe(gulp.dest('dist/assets/imgs'));
})

gulp.task('move-pwa-imagens', async function () {
    return gulp.src('src/assets/imgs/pwa/**/*')
        .pipe(gulp.dest('dist/assets/imgs/pwa'));
})

gulp.task('default', gulp.series('copy'));

gulp.task('build', gulp.series(
        'clean',
        'static-files',
         parallel(
            'usemin-replace', 
            'convert-webp',
            'move-pwa-imagens',
            ))
        );