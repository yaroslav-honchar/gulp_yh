import gulp from "gulp"

export default gulp.task("watch", () => {
  gulp.watch("./src/views/**/*.{json,twig}", gulp.series("twig"))
  gulp.watch("./src/scss/**/*.scss", gulp.series("styles"))
})
