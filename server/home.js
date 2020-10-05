const http = require('http');
const hostname = '0.0.0.0';
const port = 3005;
const server = http.createServer((req, res) => {
res.statusCode = 200;
res.setHeader('Content-Type', 'text/plain');
res.end('Hello World\n');
});
server.listen(port, hostname, () => {

  console.log('test')
console.log(`服务器运行在 http://${hostname}:${port}/`);
});