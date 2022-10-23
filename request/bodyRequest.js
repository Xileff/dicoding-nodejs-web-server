const http = require('http')
const port = 5000
const host = 'localhost'

const requestListener = (request, response) => {
    // clientRequest(request) merupakan turunan dari class readableStream
    if(request.method === 'POST'){
        let body = []

        request.on('data', chunk => {
            body.push(chunk)
        })
    
        request.on('end', () => {
            console.log(body) // Bentuk body masih buffer
            body = Buffer.concat(body).toString()

            // response.end() dipindahkan ke sini. Karena variabel body hanya akan memiliki nilai ketika event 'end' terjadi
            const { name } = JSON.parse(body)
            response.end(`<h1>Hi, ${name}!</h1>`)
        })
    }

}

const server = http.createServer(requestListener)
server.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}`)
})

// Test
// curl -X POST -H "Content-Type: application/json" http://localhost:5000/ -d "{\"name\": \"Felix\"}"