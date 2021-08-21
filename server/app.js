const path = require('path')

const express = require('express')

const app = express()

const port = process.env.PORT || 8888

app.listen(port, () => {
  console.log(`The app server is running on port: ${port}`)
})

const SRC_DIR = path.join(__dirname, 'src/')
const HTML_FILE = path.join(SRC_DIR, 'index.html')

app.use(express.json())
app.use(express.static('public'))
app.use(express.static('dist'))

app.get('/', (req, res) => {
  res.sendFile(HTML_FILE, (err) => {
    if (err) {
      res.status(500).send(err)
    }
  })
})
