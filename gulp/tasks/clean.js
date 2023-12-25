import gulp from "gulp"
import del from "del"

export default gulp.task("clean", () => {
  return del([
    "./build",
  ])
})
