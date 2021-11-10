const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/v1/amusingxwebapiserv", { // iceApi是自定义的，用的时候也要对应写iceApi
      target: 'http://localhost:10003', // 请求的地址
      changeOrigin: true,
    })
  );
}