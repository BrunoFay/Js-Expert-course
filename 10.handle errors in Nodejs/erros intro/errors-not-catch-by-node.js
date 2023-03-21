import http from 'http';

let count = 1;

async function handler(req, res) {
  count++;
  try {
    if (count % 2 === 0) {
      await Promise.reject('error inside handler!');
    }
    for await (const data of req) {
      try {
        if (count % 2 !== 0) {
          await Promise.reject('error inside for for await!');
        }
      } catch (error) {
        console.log('a request error occurred', error);
        res.writeHead(500);
        res.write(JSON.stringify({ error: 'a request error occurred' }));
      }
    }
  } catch (error) {
    console.log('a server error occurred', error);
    res.writeHead(500);
    res.write(JSON.stringify({ error: 'a server error occurred' }));
  } finally {
    res.end();
  }
}

http.createServer(handler).listen(3000, () => console.log('server is running on port 3000'));
