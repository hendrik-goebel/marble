const http = require('http')
const fs = require('fs')
const publicFolder = 'public'
const PORT = 8080

http
  .createServer((request, response) => {

    if (request.url == '/') {
      request.url = '/index.html'
    }

    let file = './' + publicFolder + '/' + request.url
    fs.readFile(file, (err, data) => {
      if (err) {
        response.writeHeader(404, {
          'Content-Type': 'application/javascript'
        })
        response.write('404 Not Found')
        response.end()
        return
      }

      if (request.url.endsWith('.html')) {
        response.writeHeader(200, {
          'Content-Type': 'text/html'
        })
      }

      if (request.url.endsWith('.js')) {
        response.writeHeader(200, {
          'Content-Type': 'application/javascript'
        })
      }

      if (request.url.endsWith('.ogg')) {
        response.writeHeader(200, {
          'accept-ranges': 'bytes',
          'content-type': 'audio/ogg'
        })
      }

      response.write(data)
      response.end()
    })
  })
  .listen(PORT)