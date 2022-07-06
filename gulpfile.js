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
            '!src/css/**/*.css',
            '!src/js/**/*.js',
            '!src/imgs/**/*'])
            .pipe(gulp.dest('dist'));
})

gulp.task('usemin-replace', async function () {
    return gulp.src('src/**/*.html')
        .pipe(usemin({
            'js' : [uglify],
            'css' : [cssmin]
        }))
        .pipe(replace(/\.(png|jpg|jpeg|tiff)+/g, '.webp'))
        .pipe(gulp.dest('dist'));
})

gulp.task('convert-webp', async function () {
    return gulp.src('src/imgs/**/*')
        .pipe(webp())
        .pipe(gulp.dest('dist/imgs'))
})

gulp.task('default', gulp.series('copy'));

gulp.task('build', gulp.series(
        'clean',
        'static-files',
         parallel(
            'usemin-replace', 
            'convert-webp'))
        );