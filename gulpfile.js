import gulp from "gulp"
import { setGlobalVariables } from "./gulp/set-global-variables.js"
import "./gulp/tasks/index.js"

setGlobalVariables(import.meta.url)

gulp.task("build", gulp.series("twig", "styles"))

gulp.task("default", gulp.series("build", gulp.parallel("watch", "server")))
