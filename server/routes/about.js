const express = require('express');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const router = express.Router();

router.get('/', (req, res) => {
  const AboutUs = require('./About').default;
  const html = ReactDOMServer.renderToString(React.createElement(AboutUs));
  res.send(`
    <html>
      <head>
        <title>My React App</title>
      </head>
      <body>
        <div id="root">${html}</div>
        <script src="/bundle.js"></script>
      </body>
    </html>
  `);
});

module.exports = router;