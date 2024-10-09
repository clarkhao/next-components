const jsonServer = require("json-server")
const { Readable } = require("stream")
const { LoremIpsum } = require("lorem-ipsum")

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4,
  },
  wordsPerSentence: {
    max: 16,
    min: 4,
  },
})
const encoder = new TextEncoder()

// Create the server
const server = jsonServer.create()
const router = jsonServer.router("db.json")
const middlewares = jsonServer.defaults()

server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:6006")
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
})

// Use default JSON Server middlewares
server.use(middlewares)

// Custom route to return a stream
server.get("/stream", async (req, res) => {
  const stream = new Readable({
    async read() {
      // Encode the string chunks using "TextEncoder".
      for (let i = 0; i < 10; i++) {
        this.push(encoder.encode(`${lorem.generateWords(10)} `))
      }
      this.push(null)
    },
  })
  // Set headers for a JSON response
  res.setHeader("Content-Type", "text/plain")
  res.setHeader("Transfer-Encoding", "chunked")
  res.setHeader("Cache-Control", "no-cache")
  res.setHeader("X-Content-Type-Options", "nosniff")
  stream.pipe(res)
})

// Use JSON Server router
server.use(router)

// Start the server
server.listen(3000, () => {
  console.log("JSON Server is running on http://localhost:3000")
})
