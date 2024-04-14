const express = require("express")
const cors = require("cors")
const fs = require("fs")
const app = express()
const port = 8000
const path = require('path')

// Support for application/json
app.use(express.json())

// Support for application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))

// Enable CORS
app.use(cors())

// Importing the routes
const profileRouter = require(path.join(__dirname, 'dao/storage/controllers/profile'))
const watchlistRouter = require(path.join(__dirname, 'dao/storage/controllers/watchlist'))
const recoRouter = require(path.join(__dirname, 'dao/storage/controllers/reco'))

//Get user profile
app.use("/profile",profileRouter)

//Get watchlist
app.use("/watchlist",watchlistRouter)

// Get all movies
app.use("/reco",recoRouter)

//App listening on port 8000
app.listen(port, () => {
  console.log('|\x1b[36m', `Worthies app listening on port ${port}`, '\x1b[37m')
})