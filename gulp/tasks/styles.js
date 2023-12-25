import gulp from "gulp"
import gulpSass from "gulp-sass"
import * as sass from "sass"
import sourcemaps from "gulp-sourcemaps"
import plumber from "gulp-plumber"
import postcss from "gulp-postcss"
import autoprefixer from "autoprefixer"

export default gulp.task("styles", async () => {
  const sassCompiler = gulpSass(sass)

  return gulp.src("./src/scss/index.scss")
    .pipe(
      process.ifDev(
        plumber(),
      ),
    )
    .pipe(
      process.ifDev(
        sourcemaps.init(),
      ),
    )
    .pipe(sassCompiler({
      includePaths: ["node_modules"],
      errLogToConsole: true,
      outputStyle: process.isProd && "compressed",
    }))
    .pipe(postcss(process.isDev && [autoprefixer()]))
    .pipe(
      process.ifDev(
        sourcemaps.write("../maps"),
      ),
    )
    .pipe(gulp.dest((file) => {
      file.path = file.path.replace(/index\.css/, "styles.css")

      return "./build/css/"
    }))
    .pipe(
      process.ifDev(
        process.__server.reload({
          stream: true,
        }),
      ),
    )
})

