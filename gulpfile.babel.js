const gulp = require("gulp");
const sass = require("gulp-sass");
const autoprefixer = require("gulp-csso");
const minifyCSS = require("gulp-csso");
const del = require("del");
const bro = require("gulp-browserify");
const babel = require("babelify");

const paths = {
  styles: {
    src: "src/css/index.css",
    dest: "src/static/styles",
    watch: "src/css/**/*.css",
  },
  js: {
    src: "src/js/index.js",
    dest: "src/static/js",
    watch: "src/js/**/*.js",
  },
};

const clean = () => del(["src/static/js", "src/static/styles"]);

const styles = () =>
  gulp
    .src(paths.styles.src)
    .pipe(sass())
    .pipe(
      autoprefixer({
        cascade: false,
      })
    )
    .pipe(minifyCSS())
    .pipe(gulp.dest(paths.styles.dest));

const js = () =>
  gulp
    .src(paths.js.src)
    .pipe(
      bro({
        transform: [
          babel.configure({
            presets: ["@babel/preset-env"],
          }),
        ],
      })
    )
    .pipe(gulp.dest(paths.js.dest));

const watchFiles = () => {
  gulp.watch(paths.styles.watch, styles);
  gulp.watch(paths.js.watch, js);
};

const dev = gulp.series(clean, styles, js, watchFiles);

const build = gulp.series(clean, styles, js);

exports.build = build;
exports.default = dev;
