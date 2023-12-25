import gulp from "gulp"
import ttf2svg from "gulp-ttf-svg"
import ttf2eot from "gulp-ttf2eot"
import ttf2woff from "gulp-ttf2woff"
import ttf2woff2 from "gulp-ttf2woff2"

gulp.task("fonts:copy", () => {
  return gulp.src("./src/assets/fonts/*.*").pipe(gulp.dest("./build/fonts/"))
})

gulp.task("fonts:generate", () => {
  return gulp
    .src("./src/assets/fonts/*.ttf")
    .pipe(gulp.dest("./src/assets/fonts/"))
    .pipe(gulp.src("./src/assets/fonts/*.ttf"))
    .pipe(ttf2svg())
    .pipe(gulp.dest("./src/assets/fonts/"))
    .pipe(gulp.src("./src/assets/fonts/*.ttf"))
    .pipe(ttf2eot())
    .pipe(gulp.dest("./src/assets/fonts/"))
    .pipe(gulp.src("./src/assets/fonts/*.ttf"))
    .pipe(ttf2woff())
    .pipe(gulp.dest("./src/assets/fonts/"))
    .pipe(gulp.src("./src/assets/fonts/*.ttf"))
    .pipe(ttf2woff2())
    .pipe(gulp.dest("./src/assets/fonts/"))
    .pipe(gulp.src("./src/assets/fonts/*.ttf"))
    .pipe(gulp.dest("./src/assets/fonts/"))
})


