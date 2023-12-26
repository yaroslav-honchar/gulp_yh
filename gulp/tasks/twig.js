import fs from "fs"
import path from "path"
import gulp from "gulp"
import twig from "gulp-twig"
import htmlmin from "gulp-htmlmin"
import flatten from "gulp-flatten"
import plumber from "gulp-plumber"
import data from "gulp-data"
import htmlbeautify from "gulp-html-beautify"

gulp.task("twig", () => {
  return gulp.src("./src/views/**/{*.page,index}.twig")
    .pipe(
      process.ifDev(
        plumber(),
      ),
    )
    .pipe(data(async (file) => {
      const currentPage = path.basename(file.path).replace(/(\.page|\.twig)+$/g, "");
      const devMenuDataPath = path.join(process.__rootDirPath, "src", "views", "_dev-menu", "dev-menu.json");

      try {
        const devMenuDataString = await fs.promises.readFile(devMenuDataPath, "utf8");
        const devMenuData = JSON.parse(devMenuDataString);
        const devMenuDataLinkIdx = devMenuData.findIndex((link) => currentPage === link.id);

        if (devMenuDataLinkIdx === -1) {
          devMenuData.push({
            id: currentPage,
            title: currentPage.replace(/[-_]/g, " "),
            href: currentPage + ".html",
          });
        }

        await fs.promises.writeFile(devMenuDataPath, JSON.stringify(devMenuData));

        return { current_page: currentPage, is_dev: process.isDev };
      } catch (error) {
        console.error('Error:', error);
        return { current_page: currentPage, is_dev: process.isDev };
      }
    }))
    .pipe(twig({
      base: "./src/views",
      functions: [
        {
          name: "data",
          func: function(fileName) {
            return JSON.parse(fs.readFileSync(path.join(process.__rootDirPath, "src", "views", "_data", `${fileName}.json`), "utf8"))
          },
        },
        {
          name: "dev_menu",
          func: function() {
            return JSON.parse(fs.readFileSync(path.join(process.__rootDirPath, "src", "views", "_dev-menu", "dev-menu.json"), "utf8"))
          },
        },
      ],
    }))
    .pipe(
      process.ifDev(
        htmlbeautify()
      )
    )
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
