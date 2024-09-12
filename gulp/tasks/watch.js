import gulp from "gulp"

gulp.task("watch", () => {
  const { watch } = gulp

  watch(
    [
      "./src/views/**/!(_dev-menu)/*.{json,twig}",
      "./src/views/_dev-menu/dev-menu.{js,css,twig}",
    ],
    gulp.series("twig"),
  )

  if (process.stylesPreprocessor === "scss") {
    watch("./src/styles/scss/**/*.scss", gulp.series("styles:scss"))
  } else if(process.stylesPreprocessor === "tailwind") {
    watch("./src/styles/tailwind/**/*.css", gulp.series("styles:tailwind"))
  }

  watch("./src/js/**/*.js", gulp.series("script"))
  watch("./src/assets/fonts/*.*", gulp.series("fonts:copy"))
  watch("./src/assets/icons/*.svg", gulp.series("svg:icons"))
  watch("./src/assets/svg/*.svg", gulp.series("svg:pictures"))
  watch("./src/assets/img/**/*.{png,jpeg,jpg,webp,gif}", gulp.series("media:images"))
  watch("./src/pwa/service-worker.js", gulp.series("pwa:sw"))
})
