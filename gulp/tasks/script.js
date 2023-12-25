import gulp from "gulp"
import * as rollup from "rollup"
import { babel } from "@rollup/plugin-babel"
import { nodeResolve } from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"
import terser from "@rollup/plugin-terser"
import multi from "@rollup/plugin-multi-entry"

gulp.task("script", () => {
  return rollup.rollup({
    input: ["src/js/index.js"],
    plugins: [
      multi(),
      nodeResolve(),
      commonjs(),
      babel({
        babelHelpers: "bundled",
        presets: [
          ...(process.isProd ? ["@babel/preset-env"] : []),
        ],
      }),
    ],
  })
    .then((bundle) => {
      return bundle.write({
        file: "build/js/main.js",
        format: "iife",
        sourcemap: process.isDev,
        plugins: [
          ...(process.isProd ? [terser()] : []),
        ],
      })
    }).then(() => {
      process.__server.reload()
    })
})