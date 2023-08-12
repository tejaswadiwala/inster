import express from 'express'

const app = express()

// Define a basic route
app.get('/', (req, res) => {
  res.send('Hello, Express in my existing Node.js project!')
})

export default app
