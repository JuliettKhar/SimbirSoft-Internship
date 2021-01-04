const path = require('path');

module.exports = {
  publicPath: '/',
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src/'),
      },
    },
  },
  chainWebpack: config => {
    const svgRule = config.module.rule('svg');

    svgRule.uses.clear();
    svgRule
      .use('babel-loader')
      .loader('babel-loader')
      .end()
      .use('vue-svg-loader')
      .loader('vue-svg-loader');

    config.plugin('html').tap(args => {
      args[0].meta = [
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0',
        },
      ];
      return args;
    });
  },

  css: {
    loaderOptions: {
      scss: {
        sassOptions: {
          includePaths: [path.resolve(__dirname, 'src/scss/core/')],
          indentedSyntax: false,
        },
        /*
         * prependData: `
         *   @import "@/assets/scss/mixins/index.scss";
         *   @import "@/assets/scss/core/_variables.scss";
         * `,
         */
      },
    },
  },

  assetsDir: '@/assets/',
};
