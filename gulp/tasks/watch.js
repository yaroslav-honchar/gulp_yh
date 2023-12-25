import gulp from "gulp"

gulp.task("watch", () => {
  const { watch } = gulp

  watch("./src/views/**/*.{json,twig}", gulp.series("twig"))

  watch("./src/scss/**/*.scss", gulp.series("styles"))

  watch("./src/js/**/*.js", gulp.series("script"))

  watch("./src/assets/fonts/*.*", gulp.series("fonts:copy"))

  watch("./src/pwa/service-worker.js", gulp.series("pwa:sw"))

  watch("./src/assets/icons/*.svg", gulp.series("svg:icons"))
  watch("./src/assets/svg/*.svg", gulp.series("svg:pictures"))

})
