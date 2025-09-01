const { createServer } = require('node:http');

const hostname = '127.0.0.1';
const port = 3000;

const server = createServer((req, res) => {
  // 👀 Let's log some parts of the request
  console.log("Method:", req.method);   // GET, POST, etc.
  console.log("URL:", req.url);         // /, /about, etc.
  console.log("Headers:", req.headers); // all request headers

  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Check your terminal for req details!');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
