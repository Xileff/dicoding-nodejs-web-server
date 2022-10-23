const http = require('http')
const port = 5000
const host = 'localhost'
/**
 * Logika untuk menangani dan menanggapi request dituliskan pada fungsi ini
 * 
 * @param request: objek yang berisikan informasi terkait permintaan. Merupakan turunan dari class readableStream
 * @param response: objek yang digunakan untuk menanggapi permintaan
 */

const requestListener = (request, response) => {
    const { method } = request

    response.setHeader('Content-Type', 'text/html')
    response.statusCode = 200

    let msg
    switch (method) {
        case 'GET':
            msg = '<h1>Hello HTTP GET!</h1>'
            break
        
        case 'POST':
            msg = '<h1>Hello HTTP POST!</h1>'
            break
        
        case 'PUT':
            msg = '<h1>Hello HTTP PUT!</h1>'
            break
        
        case 'DELETE':
            msg = '<h1>Hello HTTP DELETE!</h1>'
            break
    }
    
    response.end(msg)
}

const server = http.createServer(requestListener)
server.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}`)
})