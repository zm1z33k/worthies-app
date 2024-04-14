const express = require("express")
const router = express.Router()
const path = require('path');
const { 
  getJsonDataFromFile, 
  getMovies, getUsers, 
  findUserByid, 
  getWatchlistById, 
  writeToWatchlist} = require(path.join(__dirname, '../utils/utils.js'));

// Get the watchlist of the selected user
router.get("/", (req, res) => {
    const selectedUser = findUserByid(req.body.userId)
  
    // Check if the user is defined
    if (selectedUser == undefined){
      res.send({
        "success":false,
        "error":"User is not defined"
      })
      console.log('|\x1b[31m',"User is not defined.", '\x1b[37m')
      return
    }
  
    // Get the watchlist of the selected user
    let watchlist = getWatchlistById(selectedUser.watchlistId)
  
    // Send the watchlist as response
    res.send(watchlist)
  
    console.log('|\x1b[32m', "Watchlist selected: " + selectedUser.name, '\x1b[37m')
  })

  // Add a movie to the watchlist
  module.exports = router