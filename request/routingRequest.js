const http = require('http')
const port = 5000
const host = 'localhost'

const requestListener = (request, response) => {
    response.setHeader('Content-Type', 'application/json')
    response.setHeader('X-Powered-By', 'NodeJS')

    const { url, method } = request

    switch(url){
        case '/':
            if(method === 'GET'){
                // curl -X GET http://localhost:5000/
                response.statusCode = 200
                response.end(JSON.stringify({
                    message: "This is homepage"
                }))
            }
            else {
                // curl -X <any> T http://localhost:5000/
                response.statusCode = 400
                response.end(JSON.stringify({
                    message: `Page cannot be accessed with ${method} request`
                }))
            }
            break
        
        case '/about':
            if(method === 'GET'){
                // curl -X GET T http://localhost:5000/about
                response.statusCode = 200
                response.end(JSON.stringify({
                    message: "This is about page"
                }))
            }

            else if(method === 'POST'){
                // curl -X POST T http://localhost:5000/about

                let body = []

                request.on('data', chunk => {
                    body.push(chunk)
                })

                request.on('end', () => {
                    body = Buffer.concat(body).toString()
                    const { name } = JSON.parse(body)

                    response.statusCode = 200
                    response.end(JSON.stringify({
                        message: `Hello, ${name}! This is about page`
                    }))
                })
                
            }

            else {
                // curl -X <any> T http://localhost:5000/about
                response.statusCode = 400
                response.end(JSON.stringify({
                    message: `Page cannot be accessed with ${method} request`
                }))
            }

            break

        default:
            // curl -X any T http://localhost:5000/<any>
            response.statusCode = 404
            response.end(JSON.stringify({
                message: `Page not found`
            }))
            break
    }
}

const server = http.createServer(requestListener)
server.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}`)
})


// curl -X GET http://localhost:5000/about
// // output: <h1>Halo! Ini adalah halaman about</h1>
// curl -X POST -H "Content-Type: application/json" http://localhost:5000/about -d "{\"name\": \"Felix\"}"
// // output: <h1>Halo, Dicoding! Ini adalah halaman about</h1>
// curl -X PUT http://localhost:5000/about
// // output: <h1>Halaman tidak dapat diakses menggunakan PUT request</h1>
// curl -X DELETE http://localhost:5000/about
// // output: <h1>Halaman tidak dapat diakses menggunakan DELETE request</h1>