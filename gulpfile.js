"use strict";
const gulp = require('gulp');

const sass = require('gulp-sass'),
      watch = require('gulp-watch'),
      inject = require('gulp-inject'),
      postcss = require('gulp-postcss'),
      imagemin = require('gulp-imagemin'),
      minifyjs = require('gulp-js-minify'),
      cleanCSS = require('gulp-clean-css'),
      sourcemaps = require('gulp-sourcemaps'),
      autoprefixer = require('gulp-autoprefixer'),
      browserSync = require('browser-sync').create();


/* ==============================
    static server
============================== */
gulp.task('browser-sync', function() {
    browserSync.init(['*'], {
        server: {
            baseDir: "./"
        }
    });
    gulp.watch('*').on('change', browserSync.reload);
});


/* ==============================
    sass sync watch
============================== */
gulp.task('sass', function () {
    return gulp.src('./css/src/*.scss')
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(gulp.dest('./css/tmp'))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('sass:watch', function () {
    gulp.watch('./css/src/*.scss', ['sass']);
});



/* ==============================
    css autoprefixer & minify -> tmp to dist
============================== */
gulp.task('prefix-css', function () {
    return watch('./css/tmp/*.css', { ignoreInitial: false })
        .pipe(autoprefixer({
            browsers: ['cover 99.5%'],
            cascade: false
        }))
        .pipe(cleanCSS())
        .pipe(gulp.dest('./css/dist'));
});


/* ==============================
    minify js
============================== */
gulp.task('jsmin', function () {
    return watch('./js/src/*.js', function () {
        gulp.src('./js/src/*.js')
            .pipe(minifyjs())
            .pipe(gulp.dest('./js/dist'))
            .pipe(browserSync.reload({stream: true}));
    });
});


/* ==============================
    image resizer
============================== */
gulp.task('img-resize', () =>
	gulp.src('./images/src/*')
		.pipe(imagemin())
		.pipe(gulp.dest('./images/dist'))
        .pipe(browserSync.reload({stream: true}))
);


/* ==============================
    inject assets
============================== */
gulp.task('inject', function () {
    let target = gulp.src('./index.html');
    let sources = gulp.src(['./js/dist/*.js', './css/dist/style.css'], {read: false});

    return target.pipe(inject(sources))
        .pipe(gulp.dest('./'))
        .pipe(browserSync.reload({stream: true}));
});


/* ==============================
    gulp watch
============================== */
gulp.task('watch', ['browser-sync',
                    'sass:watch',
                    'prefix-css',
                    'jsmin',
                    'img-resize',
                    'inject'])
