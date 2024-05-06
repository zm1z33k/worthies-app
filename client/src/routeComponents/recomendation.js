import Dropdown from 'react-bootstrap/Dropdown';
import { useState } from 'react';

function Recommendation() {

    const [genre, setGenre] = useState(null)
    const [rating, setRating] = useState(null)

    const handleGenreChange = (genreWanted) => {
        setGenre(genreWanted)
        localStorage.setItem('genre', genreWanted)
    };

    const handleRatingChange = (ratingWanted) => {
        setRating(ratingWanted)
        localStorage.setItem('rating', ratingWanted)
    };

    const [showError, setShowError] = useState()

    return ( 
        <div className='mainPageContainer' style={{maxWidth: "400px", margin: "auto"}}>
            <h3 style={{fontFamily: "Bahnschrift", fontWeight: "bold", width:"100%", textAlign: "center"}}>
                Recommendation
            </h3>

            <div className="dropdown-container" style={{marginTop: "100px"}}>
                <Dropdown >
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        {rating || "Select rating"}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => handleRatingChange(7)}>7</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleRatingChange(8)}>8</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleRatingChange(9)}>9</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>

                <Dropdown >
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                    {genre || "Select genre"}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => handleGenreChange("Action")}>Action</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleGenreChange("Adventure")}>Adventure</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleGenreChange("Comedy")}>Comedy</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleGenreChange("Crime")}>Crime</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleGenreChange("Documentary")}>Documentary</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleGenreChange("Drama")}>Drama</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleGenreChange("Fantasy")}>Fantasy</Dropdown.Item>                      
                        <Dropdown.Item onClick={() => handleGenreChange("Scifi")}>Scifi</Dropdown.Item>                  
                        <Dropdown.Item onClick={() => handleGenreChange("Thriller")}>Thriller</Dropdown.Item>   
                    </Dropdown.Menu>
                </Dropdown>

            </div>

            <a href="/reco/set">
                <img src={process.env.PUBLIC_URL + '/reco_button.png'} style={{height: "150px", marginTop: "100px"}}></img>
            </a>
        </div>
     );
}

export default Recommendation;