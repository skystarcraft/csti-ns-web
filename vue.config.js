// vue.config.js
module.exports = {
  lintOnSave: false,
  devServer: {
    proxy: {
      '/sso': {
        target: 'http://localhost:8086/', //对应自己的接口
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/sso': ''
        }
      },
      '/art': {
        target: 'http://localhost:8082/', //对应自己的接口
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/art': ''
        }
      },
      '/front': {
        target: 'http://localhost:8079/', //对应自己的接口
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/front': ''
        }
      },
      '/es': {
        target: 'http://localhost:8085/', //对应自己的接口
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/es': ''
        }
      },
      '/pay': {
        target: 'http://localhost:8088/', //对应自己的接口
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/pay': ''
        }
      },
      '/acom': {
        target: 'http://localhost:8083/', //对应自己的接口
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/acom': ''
        }
      },
      '/res': {
        target: 'http://localhost:8084/', //对应自己的接口
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/res': ''
        }
      },
      '/manager': {
        target: 'http://localhost:8087/', //对应自己的接口
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/manager': ''
        }
      },
      '/per': {
        target: 'http://localhost:8089/', //对应自己的接口
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/per': ''
        }
      }
    }
  }
}
