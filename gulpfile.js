var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    autoprefixer = require('gulp-autoprefixer'),
    cssnano = require('gulp-cssnano'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass');

sass.compiler = require('node-sass');


gulp.task('sass', function() {
    return gulp.src('sass/index.scss')
    .pipe(sass())
    .pipe(autoprefixer({browsers: ['last 15 versions'],  cascade: true }))
    .pipe(gulp.dest('css'))
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('css-minify-and-rename', function() {
    return gulp.src('css/index.css')
        .pipe(cssnano())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('css'))
});


gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: './'
        },
        notify: false
    });
});

gulp.task('watch', ['sass', 'browser-sync'], function() {
    gulp.watch('sass/**/*.scss', ['sass']);
    gulp.watch('*.html', browserSync.reload);
});

gulp.task('default', ['watch']);