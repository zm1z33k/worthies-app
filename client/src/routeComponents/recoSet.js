// Use useState and useEffect to handle the asynchronous nature of sendDataToServer
import { useState, useEffect, useContext } from 'react';
import UserContext from '../contexts/userContext';


// Modify sendDataToServer to handle it as an async function
async function sendDataToServer(genre, rating, user) {
    try {
        const response = await fetch('http://localhost:8000/reco/set', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "genre": genre,
                "rating": rating,
                "userId": user.name
            }),
        });
        const data = await response.json(); // Assuming server responds with JSON
        return data;
    } catch (error) {
        console.error('Error:', error);
        return null; // Handle errors, such as by returning null or an error state
    }
}

function RecommendationSet() {
    const { user } = useContext(UserContext);
    const [data, setData] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const savedRating = localStorage.getItem('rating');
        const savedGenre = localStorage.getItem('genre');

        if (savedGenre && savedRating && user) {
            sendDataToServer(savedGenre, savedRating, user)
                .then(result => {
                    if (result) {
                        setData(result);
                    } else {
                        setError('Failed to fetch data');
                    }
                })
                .catch(err => setError('An error occurred'));
        } else {
            setError('You need to select your preferences first!');
        }
    }, [user]); // Dependency array ensures this runs when user changes, add savedRating and savedGenre if they are reactive

    if (error) {
        return (
            <div className='mainPageContainer' style={{maxWidth: "400px", margin: "auto"}}>
                <p style={{fontFamily: "Bahnschrift", fontWeight: "bold", color: "red", marginTop: "100px"}}>{error}</p>
            </div>
        );
    }

    if (!data) return null; // or some loading indicator

    return (
        <div className='mainPageContainer' style={{maxWidth: "1200px", margin: "auto", width: "100%"}}>
            <h3 style={{fontFamily: "Bahnschrift", fontWeight: "bold", width:"100%", textAlign: "center"}}>
                Recommendation
            </h3>

            <div style={{display: "flex" ,marginTop: "20px", height: "60vh", justifyItems: "center"}}>
                
                <div style={{display: "flex", justifyContent: "center", alignItems: "center", width: "33%", flexDirection: "column"}}>
                    <div>
                        <p style={{fontFamily: "Bahnschrift", fontWeight: "bold", marginBottom: "5px"}}>Rating</p>
                        <h3 style={{fontFamily: "Bahnschrift", fontWeight: "bold"}}>{data.rating}</h3> 
                    </div>
                    <br></br>
                    <div>
                        <p style={{fontFamily: "Bahnschrift", fontWeight: "bold" , marginBottom: "5px"}}>Genre</p>
                        <h3 style={{fontFamily: "Bahnschrift", fontWeight: "bold"}}>{data.genre}</h3> 
                    </div>
                </div>

                <div style={{display: "flex", justifyContent: "center", alignItems: "center", width: "33%", flexDirection: "column"}}>
                    <img src={"http://localhost:8000"+data.poster} style={{maxWidth: "300px"}}>
                    </img>
                </div>

                <div style={{display: "flex", justifyContent: "center", alignItems: "center", width: "33%", flexDirection: "column"}}>
                    <h3 style={{fontFamily: "Bahnschrift", fontWeight: "bold"}}>{data.title}</h3> 
                </div>

            </div>
        </div>
    );
}

export default RecommendationSet;