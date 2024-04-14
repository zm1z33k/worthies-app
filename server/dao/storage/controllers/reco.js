const express = require("express")
const router = express.Router()
const path = require('path');
const { 
  getJsonDataFromFile, 
  getMovies, getUsers, 
  findUserByid, 
  getWatchlistById, 
  writeToWatchlist} = require(path.join(__dirname, '../utils/utils.js'));

// Get a random movie based on the rating and genre
const getRandomMovie = (rating, genre) => {

  // Filter movies based on rating and genre
  let filterMovies = getMovies()

  // Filter by rating
  filterMovies = filterMovies.filter(movie => (movie.rating >= rating && movie.genre == genre))


  // Pick a random movie from the filtered list
  const randomIndex = Math.floor(Math.random() * filterMovies.length)

  // Return the random movie
  const randomMovie = filterMovies[randomIndex]
  
  return randomMovie
}

//Get recommendation
router.post("/set", (req, res) => {

  if (req.body.genre == undefined || req.body.rating == undefined){
    res.send({
      "success":false,
      "error":"dtoIn is not valid"
    })
    console.log('|\x1b[31m',"dtoIn is not valid", '\x1b[37m')
    return
  }

  console.log('|\x1b[32m', "Recommendation set with parameters: " 
    + req.body.rating + ", " + req.body.genre, '\x1b[37m')
  
  // Get a random movie based on the rating and genre
  const randomMovie = getRandomMovie(req.body.rating, req.body.genre)

  if (randomMovie == undefined){
    res.send({
      "success":false,
      "error":"Selected genre or rating is not valid"
    })
    console.log('|\x1b[31m',"Selected genre or rating is not valid", '\x1b[37m')
    return
  }

  const today = new Date()

  // Send the random movie as response
  console.log('|\x1b[32m', "Recommendation displayed: " + randomMovie.title, '\x1b[37m')

  sendingJson = {
    title: randomMovie.title,
    rating: randomMovie.rating,
    genre: randomMovie.genre,
    poster: `/dao/storage/recoToShow/posters/${randomMovie.poster}`,
    date: today.getDate().toString()+"-"+(today.getMonth()+1).toString()+"-"+today.getFullYear().toString()
  }

  // Send the random movie as response
  res.send(sendingJson)

  // Add randomMovie to the watchlist of the currently selected user
  let userInfo = findUserByid(req.body.userId)
  let userWatchlistId = userInfo.watchlistId
  let userWatchlist = getWatchlistById(userWatchlistId)
  userWatchlist.push({
    "title":sendingJson.title,
    "date":sendingJson.date
  })

  // Write the updated watchlist to the file
  writeToWatchlist(userWatchlistId,userWatchlist)
  console.log('|\x1b[32m', "Recommendation (" + sendingJson.title + ") added to (" 
    + userInfo.name + ") watchlist", '\x1b[37m')
})

module.exports = router