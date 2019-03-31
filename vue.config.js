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
        target: 'http://localhost:8080/', //对应自己的接口
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/front': ''
        }
      },
      '/search': {
        target: 'http://localhost:8085/', //对应自己的接口
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/search': ''
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
      '/comment': {
        target: 'http://localhost:8083/', //对应自己的接口
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/comment': ''
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
      }
    }
  }
}
