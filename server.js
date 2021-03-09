const express = require('express')
const dotenv = require('dotenv')
const path = require('path')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const connectDB = require('./server/database/connection')

const app = express()

//dotenv keep secret from source code
dotenv.config({path: "config.env"})
const PORT = process.env.PORT || 8080

//parse request with body-parser
app.use(bodyParser.urlencoded({extended: true}))

//set view engine
app.set('view engine', 'ejs')

//log request
app.use(morgan("tiny"))

//load MongoDB Connection
connectDB()

//load assets
app.use('/css', express.static(path.resolve(__dirname, 'assets/css')))
app.use('/img', express.static(path.resolve(__dirname, 'assets/img')))
app.use('/js', express.static(path.resolve(__dirname, 'assets/js')))

//load routes
app.use('/', require('./server/routes/router'))

//create server
app.listen(PORT, () => {
    console.log(`Server is running fine!! and running on port ${PORT}`)
})