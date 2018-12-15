let bodyParser = require('body-parser')
let express = require('express')
let app = express()

app.use(bodyParser.json())

let nucleotideService = require('./services/nucleotide.service.js')(app)

app.listen(3000)
