import gulp from "gulp"
import favicons from "gulp-favicons"
import { parseString, Builder } from "xml2js"

gulp.task("pwa:sw", () => {
  return gulp.src("./src/pwa/service-worker.js")
    .pipe(gulp.dest("./build"))
})

gulp.task("pwa:favicons", () => {
  return gulp.src("./src/pwa/favicon.png")
    .pipe(
      favicons({
        path: "/", // Path for overriding default icons path. `string`
        appName: "Empty project", // Your application's name. `string`
        appShortName: "Empty project", // Your application's short_name. `string`. Optional. If not set, appName will be used
        appDescription: "Empty project", // Your application's description. `string`
        developerName: "Empty project", // Your (or your developer's) name. `string`
        developerURL: "Empty project", // Your (or your developer's) URL. `string`
        cacheBustingQueryParam: null, // Query parameter added to all URLs that acts as a cache busting system. `string | null`
        dir: "auto", // Primary text direction for name, short_name, and description
        lang: "en-US", // Primary language for name and short_name
        background: "#fff", // Background colour for flattened icons. `string`
        theme_color: "#fff", // Theme color user for example in Android's task switcher. `string`
        appleStatusBarStyle: "black-translucent", // Style for Apple status bar: "black-translucent", "default", "black". `string`
        display: "standalone", // Preferred display mode: "fullscreen", "standalone", "minimal-ui" or "browser". `string`
        orientation: "any", // Default orientation: "any", "natural", "portrait" or "landscape". `string`
        scope: "/", // set of URLs that the browser considers within your app
        start_url: "/", // Start URL when launching the application from a device. `string`
        preferRelatedApplications: false, // Should the browser prompt the user to install the native companion app. `boolean`
        relatedApplications: undefined, // Information about the native companion apps. This will only be used if `preferRelatedApplications` is `true`. `Array<{ id: string, url: string, platform: string }>`
        version: "1.0", // Your application's version string. `string`
        pixel_art: false, // Keeps pixels "sharp" when scaling up, for pixel art.  Only supported in offline mode.
        loadManifestWithCredentials: false, // Browsers don't send cookies when fetching a manifest, enable this to fix that. `boolean`
        manifestMaskable: false, // Maskable source image(s) for manifest.json. "true" to use default source. More information at https://web.dev/maskable-icon/. `boolean`, `string`, `buffer` or array of `string`
        icons: {
          android: true,
          appleIcon: true,
          appleStartup: true, // Create Apple startup images. `boolean` or `{ offset, background }` or an array of sources
          favicons: true, // Create regular favicons. `boolean` or `{ offset, background }` or an array of sources
          windows: true, // Create Windows 8 tile icons. `boolean` or `{ offset, background }` or an array of sources
          yandex: false, // Create Yandex browser icon. `boolean` or `{ offset, background }` or an array of sources
        },
      }),
    )
    .pipe(gulp.dest((file) => {
      if (/manifest\.webmanifest/.test(file.path)) {
        const manifest = JSON.parse(file.contents)

        manifest.icons.map((icon) => {
          icon.src = "./favicons" + icon.src
          return icon
        })

        file.contents = new Buffer.from(JSON.stringify(manifest))
        file.path = "manifest.json"

        return "./build"
      }

      if (/browserconfig\.xml/.test(file.path)) {
        const xmlContent = file.contents.toString()

        parseString(xmlContent, (err, result) => {
          if (err) {
            console.error("Error parsing XML:", err)
            return
          }

          result.browserconfig.msapplication.forEach((msapplicationItem) => {
            msapplicationItem.tile.forEach((tileItem) => {

              for (const tileItemKey in tileItem) {
                if (Object.prototype.hasOwnProperty.call(tileItem, tileItemKey)) {
                  const tileItemValue = tileItem[tileItemKey]

                  tileItemValue.map((attr) => {
                    if(attr?.$?.src) {
                      attr.$.src = "./favicons" + attr["$"].src
                    }

                    return attr
                  })
                }
              }
            })
          })

          const builder = new Builder()
          const xml = builder.buildObject(result)

          file.contents = new Buffer.from(xml)
        })

        return "./build"
      }

      return "./build/favicons"
    }))
})