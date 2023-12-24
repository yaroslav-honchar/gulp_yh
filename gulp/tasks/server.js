import gulp from "gulp"

export default gulp.task("server", () => {
  return process.__server.init({
    server: {
      baseDir: "./build",
    },
  })
})