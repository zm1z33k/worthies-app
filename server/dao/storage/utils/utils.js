const fs = require("fs")
const path = require('path');

// Get JSON data from a file
function getJsonDataFromFile(filePath){
    try {
      const data = fs.readFileSync(filePath, "utf8")
      return JSON.parse(data)
    } catch (err) {
      console.error("Error reading file:", err)
      console.log('|\x1b[31m',"Error reading file:", err, '\x1b[37m')
    }
}

// Get movies from the JSON file
function getMovies(){
    return getJsonDataFromFile(path.join(__dirname, "../recoToShow/movies.json"))
}

// Get users from the JSON file
function getUsers(){
    return getJsonDataFromFile(path.join(__dirname, "../userList/users.json"))
}

// Find a user by ID
function findUserByid(id){
    users = getUsers()
    return users.find(user => user.userId == id)
}

// Get watchlist by ID
function getWatchlistById(id){
    try {
        const data = fs.readFileSync(path.join(__dirname, "../watchlists/"+id+".json"), "utf8")
        return JSON.parse(data)
    } catch (err) {
        console.error("Error reading file:", err)
        console.log('|\x1b[31m',"Error reading file:", err, '\x1b[37m')
    }
}

// Write to watchlist
function writeToWatchlist(id, data){
    try {
        fs.writeFileSync(path.join(__dirname, "../watchlists/"+id+".json"),JSON.stringify(data,null,2))
    } catch (err) {
        console.error("Error reading file:", err)
        console.log('|\x1b[31m',"Error reading file:", err, '\x1b[37m')
    }
}

// Export the functions
module.exports = { 
    getJsonDataFromFile, 
    getMovies, 
    getUsers, 
    findUserByid, 
    getWatchlistById, 
    writeToWatchlist
}