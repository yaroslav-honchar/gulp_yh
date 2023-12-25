import gulp from "gulp"
import changed from "gulp-changed"
import imagemin, { gifsicle, mozjpeg, optipng } from "gulp-imagemin"
import webp from "gulp-webp"

gulp.task("media:images", () => {
  return gulp.src("./src/assets/img/**/*.{png,jpeg,jpg,webp,gif}")
    .pipe(changed("./build/img/"))
    .pipe(
      imagemin([
        gifsicle({ interlaced: true }),
        mozjpeg({ quality: 75, progressive: true }),
        optipng({ optimizationLevel: 5 }),
      ]),
    )
    .pipe(gulp.dest("./build/img"))
    .pipe(webp({ quality: 90 }))
    .pipe(gulp.dest("./build/img"))
})