const port = '8080';

const PROXY_CONFIG = [
  {
      context: [
          "/api"
      ],
      target: `http://localhost:${port}`,
      secure: false,
      "pathRewrite": {
        "^/api": "/api"
      },
      "changeOrigin": true,
      "logLevel": "debug"
  }
];

module.exports = PROXY_CONFIG;