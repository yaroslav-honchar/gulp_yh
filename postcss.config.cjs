module.exports = {
  plugins: [
    require("autoprefixer"),
    require("postcss-combine-media-query"),
    require("postcss-sort-media-queries"),
    require("postcss-short"),
    require("cssnano")({
      preset: [
        "default",
        {
          discardComments: {
            removeAll: true,
          },
        },
      ],
    }),
  ],
}
