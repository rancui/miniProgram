
const path = require('path');

// 获取环境
const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  productionSourceMap: false,
  devServer: {
    proxy: {
      '/VcreditAppAPI': {
        target: 'http://211.95.59.228:8000',
        pathRewrite: {
          '^/VcreditAppAPI': '/VcreditAppAPI'
        }
      }
    },
  }, 
  configureWebpack: (config) => {
    // 非生产环境
    if (!isProd) {
   
    } else { // 生产环境
      const terserWebpackPlugin = config.optimization.minimizer[0];
      const { terserOptions } = terserWebpackPlugin.options;
      terserOptions.compress.drop_console = true;
      terserOptions.compress.drop_debugger = true;
      terserOptions.compress.pure_funcs = ['console.log'];
    }

  },
  chainWebpack: (config) => {
    if (isProd) {
      config.plugin('html').tap((opts) => {
        opts[0].minify = {
          removeComments: false,
        };
        return opts;
      });
    }
    // config.resolve.alias
    // .set('$css',resolve('/static/css'))
    // .set('$common',resolve('/components'))
    // .set('$api',resolve('/api'))
    // .set('$page',resolve('/pages'))
    // .set('$js',resolve('/static/js'));
    config.module
    .rule('images')
    .test(/\.(png|jpe?g|gif|webp|svg)(\?.*)?$/)
    .include.add(path.join(__dirname, 'src/assets/images'))
    .end();

  

  }
}