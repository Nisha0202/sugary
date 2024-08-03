//index.js
const express = require('express')
mongodbConnection = require('./db')
const port = 5000
const app = express()
var cors = require('cors')
const path = require('path');
const fs = require('fs');
app.use(cors())

mongodbConnection();
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(express.json())
console.log('Hello')

app.use('/api', require("./routes/CreateUser.js"));
app.use('/api', require("./routes/LoginUser.js"));
app.use('/api', require("./routes/Verify.js"));
app.use('/api', require("./routes/ForgotPass.js"));
app.use('/api', require("./routes/ResetPass.js"));
app.use('/api', require("./routes/AddItem.js"));




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
