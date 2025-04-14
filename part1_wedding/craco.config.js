const CracoAlias = require('craco-alias')
const FontPreloadPlugin = require('webpack-font-preload-plugin')
module.exports = {
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: 'tsconfig',
        tsConfigPath: 'tsconfig.paths.json',
      },
    },
  ],
  webpack: {
    plugins: {
      add: [
        new FontPreloadPlugin({
          // woff2를 우선순위로 preload
          extensions: ['woff2'],
        }),
      ],
    },
  },
}
