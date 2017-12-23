// Plugin load
const gulp = require('gulp');
const sass = require('gulp-sass');
const sassGlob = require('gulp-sass-glob');
const csscomb = require('gulp-csscomb');
const pug = require("gulp-pug")
const watch = require('gulp-watch');
const notify = require("gulp-notify");
const plumber = require('gulp-plumber');
const changed  = require('gulp-changed')
const imagemin = require("gulp-imagemin");
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();

// Setting
const path = {
  'src':'./dev/src/',
  'dist':'./public/'
}

const plumberOption = {
  errorHandler: notify.onError('<%= error.message %>')
}

// Task
gulp.task('serve', (done) => {
  const browserSyncOption = {
    server: path.dist
  }

  browserSync.init(browserSyncOption)
  done()
})

gulp.task('pug', () => {
  return gulp.src([path.src + `pug/**.pug`, !path.src + `pug/_**.pug`])
    .pipe(plumber(plumberOption))
    .pipe(pug())
    .pipe(gulp.dest(path.dist))
})

gulp.task('sass', () => {
  return gulp.src(path.src + `scss/style.scss`)
    .pipe(plumber(plumberOption))
    .pipe(sassGlob())
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(sourcemaps.write(`./`))
    .pipe(csscomb())
    .pipe(gulp.dest(path.dist + `css/`))
})

gulp.task('img', () => {
  return gulp.src(path.src + `img/*.+(jpg|jpeg|png|gif|svg)`)
    .pipe(changed(path.dist + `img`))
    .pipe(imagemin())
    .pipe(gulp.dest(path.dist + `img`))
  }
);

gulp.task('html', () => {
  return gulp.src([path.src + `index.html`])
    .pipe(gulp.dest(path.dist))
});

gulp.task('js', () => {
  return gulp.src([path.src + `js/**/*.js`])
    .pipe(gulp.dest(path.dist + `js/`))
});

gulp.task("assets", () => {
  return gulp.src([path.src + `assets/**`])
    .pipe(gulp.dest(path.dist + `assets/`))
})

gulp.task('watch', (done) => {
  const browserReload = (done) => {
    browserSync.reload()
    done()
  }
  gulp.watch(path.src + `**/*.html`, gulp.parallel('html'))
  gulp.watch(path.src + `**/*.pug`, gulp.parallel('pug'))
  gulp.watch(path.src + `**/*.scss`, gulp.parallel('sass'))
  gulp.watch(path.src + `img/**/*`, gulp.parallel('img'))
  gulp.watch(path.src + `assets/**/*`, gulp.parallel('assets'))
  gulp.watch([path.dist + `**/*.html`, path.dist + `**/*.css`], browserReload)
})

gulp.task("default", gulp.series(
  gulp.parallel('html', 'sass', 'img', 'assets'),
  "serve","watch"))

