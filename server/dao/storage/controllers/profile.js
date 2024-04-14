const express = require("express")
const router = express.Router()
const path = require('path');
const { 
  getJsonDataFromFile, 
  getMovies, 
  getUsers, 
  findUserByid, 
  getWatchlistById, 
  writeToWatchlist} = require(path.join(__dirname, '../utils/utils.js'));

// Get the user profile
router.get("/", (req, res) => {

    // Check if the user ID is defined  
    if (findUserByid(req.body.userId) == undefined){
      res.send({
        "success":false,
        "error":"User doesn't exist."
      })
      console.log('|\x1b[31m',"User doesn't exist.", '\x1b[37m')
      return
    }
  
    try{
      // Get user ID from client request
      const userId = req.body.userId
      const selectedUser = findUserByid(userId)
      console.log('|\x1b[32m', "User profile selected: " + selectedUser.name, '\x1b[37m')
  
      // Send the user info as response
      res.send({
        name: selectedUser.name,
        surname: selectedUser.surname,
        email: selectedUser.email,
        role: selectedUser.role,
        watchlistId: selectedUser.watchlistId
      })
    }catch (error){
      res.send({
        "success":false,
        "error":error
      })
      console.log('|\x1b[31m',"Couldn't get userId or send user info as response", '\x1b[37m')
    }
  })


// Update the user profile
module.exports = router