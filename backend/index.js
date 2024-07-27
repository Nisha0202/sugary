const express = require('express')
mongodbConnection = require('./db')

const port = 5000
const app = express()

mongodbConnection();
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
