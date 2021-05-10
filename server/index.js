const express = require('express')
const bodyParser = require('body-parser')
const http = require('http')
const fs = require('fs')
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Cache-Control, Key, Access-Control-Allow-Origin')
  next()
})

const port = process.env.PORT || 8080

app.use('/newsletter', function(req, res, next) {
	const users = require("./users")
	users.push(req.body)

  fs.writeFile("./users.json", JSON.stringify(users), err => {     
    if (err) throw err // Error checking
    console.log("Done writing") // Success
    return res.json({message: 'User created!'})
	});
})

http.createServer(app).listen(port, function (err) {
  if (err) return console.log(err)
  console.log(`Server running on port: ${port}`)
})

