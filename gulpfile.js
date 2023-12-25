import gulp from "gulp"
import { setGlobalVariables } from "./gulp/set-global-variables.js"
import "./gulp/tasks/index.js"

setGlobalVariables(import.meta.url)

const { task, series, parallel } = gulp

task("build", series("clean",
    parallel(
      "twig",
      "styles",
      "script",
      "fonts:copy",
      "svg:icons",
      "svg:pictures",
      "media:images",
      "pwa:favicons",
      "pwa:sw",
      "pwa:robots",
      "pwa:sitemap",
    ),
  ),
)

task("default", series("build", parallel("watch", "server")))
