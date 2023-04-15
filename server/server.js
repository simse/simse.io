import { handler } from '../build/handler.js';
import http from 'http';

const server = http.createServer((req, res) => {
  if (req.headers.host.startsWith('learn.') && !req.url.includes('_app') && !req.url.includes('fonts')) {
    req.url = '/learn' + req.url;
    if (req.url.endsWith('/')) {
        req.url = req.url.slice(0, -1);
    }
  }

  try {
    handler(req, res);
  } catch (error) {
    console.error(error);
    res.statusCode = 500;
    res.end('Internal Server Error');
  }
});

server.listen(3000); 