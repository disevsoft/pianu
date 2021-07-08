module.exports = {
  devServer: {
    proxy: {
      "^/api/": {
        target: "http://localhost:3080",
        //pathRewrite: { "^/api": "/" },
        changeOrigin: true,
        //logLevel: "debug"
      },
    },
  },
  configureWebpack: {
    devtool: "source-map",
  },
};
