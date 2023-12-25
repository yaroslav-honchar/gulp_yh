import gulp from "gulp"

gulp.task("server", () => {
  return process.__server.init({
    server: {
      baseDir: "./build",
    },
  })
})