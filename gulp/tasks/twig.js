import fs from "fs"
import path from "path"
import gulp from "gulp"
import twig from "gulp-twig"
import htmlmin from "gulp-htmlmin"
import flatten from "gulp-flatten"
import plumber from "gulp-plumber"

export default gulp.task("twig", () => {
  return gulp.src("./src/views/**/{*.page,index}.twig")
    .pipe(
      process.ifDev(
        plumber(),
      ),
    )
    .pipe(twig({
      base: "./src/views",
      functions: [
        {
          name: "data",
          func: function(fileName) {
            return JSON.parse(fs.readFileSync(path.join(process.__rootDirPath, "src", "views", "_data", `${fileName}.json`), "utf8"))
          },
        },
      ],
    }))
    .pipe(process.ifProd(
      htmlmin({
        collapseWhitespace: true,
        removeComments: true,
      })),
    )
    .pipe(flatten())
    .pipe(gulp.dest((file) => {
      file.path = file.path.replace(/\.page/, "")

      return "./build"
    }))
    .pipe(
      process.ifDev(
        process.__server.reload({
          stream: true,
        }),
      ),
    )
})
