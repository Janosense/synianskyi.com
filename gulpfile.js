"use strict";

const isDev = !process.env.NODE_ENV || process.env.NODE_ENV === 'dev';

const autoprefixer = require('autoprefixer');
const assets = require('postcss-assets');
const browserSync = require('browser-sync').create();
const cached = require('gulp-cached');
const csso = require('gulp-csso');
const debug = require('gulp-debug');
const del = require('del');
const fontMagician = require('postcss-font-magician');
const gulp = require('gulp');
const gulpIf = require('gulp-if');
const htmlMin = require('gulp-htmlmin');
const imageMin = require('gulp-imagemin');
const imageResize = require('gulp-image-resize');
const include = require('gulp-include');
const jpegReCompress = require('imagemin-jpeg-recompress');
const mqPacker = require('css-mqpacker');
const newer = require('gulp-newer');
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');
const pngQuant = require('imagemin-pngquant');
const postCss = require('gulp-postcss');
const rename = require('gulp-rename');
const rev = require('gulp-rev');
const revReplace = require('gulp-rev-replace');
const runSequence = require('run-sequence');
const sass = require('gulp-sass');
const sortCSSmq = require('sort-css-media-queries');
const sorting = require('postcss-sorting');
const sourceMaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const webp = require('gulp-webp');

const path = {
  build: {
    html: 'build',
    css: 'build/css',
    js: 'build/js',
    img: 'build/img',
    webp: 'build/img/webp',
    fonts: 'build/fonts'
  },
  source: {
    html: 'source/*.html',
    sass: 'source/sass/*.scss',
    js: 'source/js/*.js',
    img: 'source/img/**/*.{jpeg,jpg,png,svg}',
    webp: 'build/img/**/*.{jpeg,jpg,png}',
    fonts: 'source/fonts/**/*.{woff,woff2}'
  },
  watch: {
    html: 'source/**/*.html',
    sass: 'source/sass/**/*.scss',
    js: 'source/js/**/*.js',
    img: 'source/img/**/*.{jpeg,jpg,png,svg}',
    webp: 'source/img/**/*.{jpg,jpeg,png}',
    fonts: 'source/fonts/**/*.{woff2,woff}'
  },
  manifest: {
    dir: 'source/manifest',
    css: 'css.json',
    js: 'js.json'
  }
};

const orderRule = {
  'properties-order': [
    'content',
    'display',
    'float',
    'position',
    'top',
    'right',
    'bottom',
    'left',
    'width',
    'height',
    'margin',
    'margin-top',
    'margin-right',
    'margin-bottom',
    'margin-left',
    'padding',
    'padding-top',
    'padding-right',
    'padding-bottom',
    'padding-left',
    'text-align',
    'text-decoration',
    'text-transform',
    'color',
    'background-color',
    'background-image',
    'background-repeat',
    'background-size',
    'background-position',
    'font',
    'font-family',
    'font-size',
    'font-weight',
    'font-style',
    'border',
    'border-top',
    'border-right',
    'border-bottom',
    'border-left',
    'white-space',
    'word-wrap',
    'transform',
    'transition',
    'z-index'
  ]
};

let plugins = [
  mqPacker({
    sort: sortCSSmq.desktopFirst
  }),
];

if (!isDev) {
  plugins.push(sorting(orderRule));
  plugins.push(autoprefixer({
    browsers: ['last 3 versions']
  }));
}

gulp.task('sass', function () {
  return gulp.src(path.source.sass)
    .pipe(gulpIf(isDev, plumber({
      errorHandler: notify.onError(err => ({
        title: 'sass',
        message: err.message
      }))
    })))
    .pipe(gulpIf(isDev, sourceMaps.init()))
    .pipe(sass())
    .pipe(gulpIf(isDev, cached('sass')))
    .pipe(postCss(plugins))
    .pipe(gulpIf(!isDev, csso()))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulpIf(isDev, sourceMaps.write()))
    .pipe(gulpIf(!isDev, rev()))
    .pipe(gulp.dest(path.build.css))
    .pipe(gulpIf(!isDev, rev.manifest(path.manifest.css)))
    .pipe(gulpIf(!isDev, gulp.dest(path.manifest.dir)));
});

gulp.task('js', function () {
  return gulp.src(path.source.js)
    .pipe(gulpIf(isDev, plumber({
      errorHandler: notify.onError(err => ({
        title: 'js',
        message: err.message
      }))
    })))
    .pipe(gulpIf(isDev, sourceMaps.init()))
    .pipe(include({
      extensions: "js",
      hardFail: true,
    }))
    .pipe(gulpIf(!isDev, uglify()))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulpIf(isDev, sourceMaps.write()))
    .pipe(gulpIf(!isDev, rev()))
    .pipe(gulp.dest(path.build.js))
    .pipe(gulpIf(!isDev, rev.manifest(path.manifest.js)))
    .pipe(gulpIf(!isDev, gulp.dest(path.manifest.dir)));
});

gulp.task('html', function () {
  return gulp.src(path.source.html)
    .pipe(gulpIf(isDev, plumber({
      errorHandler: notify.onError(err => ({
        title: 'html',
        message: err.message
      }))
    })))
    .pipe(gulpIf(isDev, cached('html')))
    .pipe(include({
      extensions: ["svg", "html"],
      hardFail: true
    }))
    .pipe(gulpIf(!isDev, htmlMin({
      removeComments: true,
      collapseWhitespace: true,
      collapseInlineTagWhitespace: true,
      conservativeCollapse: true,
      removeEmptyAttributes: true,
      minifyCSS: true,
      minifyJS: true,
    })))
    .pipe(gulpIf(!isDev, revReplace({
      manifest: gulp.src(path.manifest.dir + '/' + path.manifest.css)
    })))
    .pipe(gulpIf(!isDev, revReplace({
      manifest: gulp.src(path.manifest.dir + '/' + path.manifest.js)
    })))
    .pipe(gulp.dest(path.build.html));
});

gulp.task('image', function () {
  return gulp.src(path.source.img)
    .pipe(gulpIf(isDev, plumber({
      errorHandler: notify.onError(err => ({
        title: 'image',
        message: err.message
      }))
    })))
    .pipe(newer(path.build.img))
    .pipe(gulpIf(!isDev, imageMin([
      pngQuant(),
      jpegReCompress(),
      imageMin.gifsicle({
        interlaced: true
      }),
      imageMin.svgo({
        plugins: [
          { removeViewBox: true },
          { cleanupIDs: false }
        ]
      })
    ], {
      verbose: true
    })))
    .pipe(gulp.dest(path.build.img));
});

gulp.task('webp', function() {
  return gulp.src(path.source.webp)
    .pipe(gulpIf(isDev, plumber({
      errorHandler: notify.onError(err => ({
        title: 'webp',
        message: err.message
      }))
    })))
    .pipe(gulpIf(isDev, cached('webp')))
    .pipe(webp({
      quality: 90
    }))
    .pipe(gulp.dest(path.build.webp));
});

gulp.task('fonts', function () {
  return gulp.src(path.source.fonts)
    .pipe(newer(path.build.fonts))
    .pipe(gulp.dest(path.build.fonts));
});

gulp.task('serve', function() {
  browserSync.init({
    server: 'build',
    notify: false,
  });

  browserSync.watch('build/**/*.*').on('change', browserSync.reload);
});

gulp.task('clear.build', function () {
  return del('build/');
});

gulp.task('clear.manifest', function () {
  return del(path.manifest.dir);
});

gulp.task('build', function (callback) {
  runSequence('fonts', 'sass', 'js', 'html', 'image', 'webp', callback);
});

gulp.task('watch', function () {
  gulp.watch(path.watch.sass, ['sass']);
  gulp.watch(path.watch.js, ['js']);
  gulp.watch(path.watch.html, ['html']);
  gulp.watch(path.watch.img, ['image']);
  gulp.watch(path.watch.webp, ['webp']);
  gulp.watch(path.watch.fonts, ['fonts']);
});

let preTasks = ['build', ['watch', 'serve']];
if (!isDev) {
  preTasks = ['clear.build', 'clear.manifest', 'build'];
}

gulp.task('default', function (callback) {
  preTasks.push(callback);
  runSequence.apply(null, preTasks);
});