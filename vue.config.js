const path = require('path');

module.exports = {
  publicPath:
    process.env.NODE_ENV === 'production' ? '/SimbirSoft-Internship/' : '/',
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src/'),
      },
    },
  },
  chainWebpack: config => {
    config.plugin('html').tap(args => {
      args[0].meta = [
        {
          name: 'viewport',
          content:
            'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0',
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
        prependData: `
          @import "@/assets/scss/core/mixins.scss";
         `,
      },
    },
  },

  assetsDir: '@/assets/',
};
