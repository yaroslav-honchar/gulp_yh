import gulp from "gulp"
import gulpSass from "gulp-sass"
import * as sass from "sass"
import sourcemaps from "gulp-sourcemaps"
import plumber from "gulp-plumber"
import postcss from "gulp-postcss"
import autoprefixer from "autoprefixer"
import tailwindcss from "tailwindcss"

gulp.task("styles:tailwind", async () => {
  return gulp.src("./src/styles/css/index.css")
    .pipe(
      process.ifDev(
        plumber(),
      ),
    )
    .pipe(postcss([
      tailwindcss("tailwind.config.js"),
      autoprefixer(),
    ]))
    .pipe(gulp.dest((file) => {
      file.path = file.path.replace(/index\.css/, "styles.css")

      return "./build/css/"
    }));
})

gulp.task("styles:scss", async () => {
  const sassCompiler = gulpSass(sass)

  return gulp.src("./src/styles/scss/index.scss")
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
      ...(process.isProd ? { outputStyle: "compressed" } : {}),
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