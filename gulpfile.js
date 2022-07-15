// list dependencies
const { src, dest, watch, series } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const autoprefixer = require("gulp-autoprefixer");
const minify = require("gulp-clean-css");
const terser = require("gulp-terser");
const imageMin = require("gulp-imagemin");
const imageWebp = require("gulp-webp");

//define tasks
//compile sass
function compileSass() {
  return src("src/scss/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(autoprefixer("last 2 versions"))
    .pipe(minify())
    .pipe(dest("dist/css"));
}

//minify js
function minifyJs() {
  return src("src/js/*.js").pipe(terser()).pipe(dest("dist/js"));
}

//minify images
function minifyImages() {
  return src("src/img/assets/*{jpg,jpeg,png}")
    .pipe(
      imageMin([
        imageMin.mozjpeg({ quality: 75, progressive: true }),
        imageMin.optipng({ optimizationLevel: 5 }),
      ])
    )
    .pipe(dest("dist/img"));
}

//convert images to webp
function convertImagesToWebp() {
  return src("src/img/assets/*{jpg,jpeg,png}")
    .pipe(imageWebp())
    .pipe(dest("dist/img"));
}

//watch for changes
function watchFiles() {
  watch("src/scss/*.scss", compileSass);
  watch("src/js/*.js", minifyJs);
  watch("src/img/assets/*{jpg,jpeg,png}", minifyImages);
  watch("src/img/assets/*{jpg,jpeg,png}", convertImagesToWebp);
}

//define default task
exports.default = series(
  compileSass,
  minifyJs,
  minifyImages,
  convertImagesToWebp,
  watchFiles
);
