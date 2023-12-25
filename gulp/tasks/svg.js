import gulp from "gulp"
import svgSprite from "gulp-svg-sprite"
import svgmin from "gulp-svgmin"
import changed from "gulp-changed"
import cheerio from "gulp-cheerio"

gulp.task("svg:icons", () => {
  return gulp.src("./src/assets/icons/*.svg")
    .pipe(changed("./build/icon/"))
    .pipe(cheerio({
      run: ($) => {
        $("[fill]").removeAttr("fill")
        $("[stroke]").removeAttr("stroke")
        $("[style]").removeAttr("style")
      },
    }))
    .pipe(svgSprite({
      mode: {
        stack: {
          sprite: "../icons/icons.svg",
          example: true,
        },
      },
    }))
    .pipe(gulp.dest("./build/icon/"))
})

gulp.task("svg:pictures", () => {
  return gulp.src("./src/assets/svg/*.svg")
    .pipe(changed("./build/svg/"))
    .pipe(svgmin())
    .pipe(gulp.dest("./build/svg/"))
})