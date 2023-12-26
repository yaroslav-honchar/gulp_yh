import { fileURLToPath } from "url"
import { dirname } from "path"
import browserSync from "browser-sync"
import ifEnv from "gulp-if-env"

export const setGlobalVariables = (indexFileUrl) => {
  /**
   * Global path to gulpfile.js
   * @type {string}
   * */
  process.__rootFileName = fileURLToPath(indexFileUrl)

  /**
   * Global path to root folder of project
   * @type {string}
   * */
  process.__rootDirPath = dirname(process.__rootFileName)

  /**
   * Instance of browser sync plugin
   * */
  process.__server = browserSync.create()

  /**
   * Configure using styles preprocessor
   * @type { "scss" | "tailwind" }
   * */
  process.stylesPreprocessor = "tailwind"

  /**
   * Property contains boolean value of development mode
   * @type {boolean}
   * */
  process.isDev = !!ifEnv("development")

  /**
   * Property contains boolean value of production mode
   * @type {boolean}
   * */
  process.isProd = !!ifEnv("production")

  /**
   * Run callback if build mode is production
   * @param {function} callback
   * */
  process.ifProd = (callback) => {
    return ifEnv("production", callback)
  }

  /**
   * Run callback if build mode is development
   * @param {function} callback
   * */
  process.ifDev = (callback) => {
    return ifEnv("development", callback)
  }
}