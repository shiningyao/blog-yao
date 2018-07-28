const express = require('express');
const app = express();
const port = '3000';

const articleRoutes = require('./routes/article');

app.use('/api', articleRoutes);

app.listen(port, () => {
  console.log(`API mock server is started on port: ${port}`);
});

const PROXY_CONFIG = [
  {
      context: [
          "/api"
      ],
      target: `http://localhost:${port}`,
      secure: false
  }
];

module.exports = PROXY_CONFIG;