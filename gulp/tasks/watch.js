import gulp from "gulp"

gulp.task("watch", () => {
  const { watch } = gulp

  watch("./src/views/**/*.{json,twig}", gulp.series("twig"))

  watch("./src/scss/**/*.scss", gulp.series("styles"))

  watch("./src/js/**/*.js", gulp.series("script"))

  watch("./src/assets/fonts/*.**", gulp.series("fonts:copy"))
})
