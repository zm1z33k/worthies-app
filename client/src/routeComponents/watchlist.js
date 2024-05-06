import Table from 'react-bootstrap/Table';
import UserContext from '../contexts/userContext';
import { useContext, useState, useEffect } from 'react';

async function sendDataToServer(user) {
    const pls = JSON.stringify({"userId": user.name})
    try {
        const response = await fetch('http://localhost:8000/watchlist', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: pls,
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json(); // Assuming server responds with JSON
        return data;
    } catch (error) {
        console.error('Error:', error);
        throw error; // Rethrow to handle it in the calling function
    }
}

function Watchlist() {
    const { user } = useContext(UserContext);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            if (user) {
                try {
                    const result = await sendDataToServer(user);
                    console.log('Data fetched:', result);
                    setData(result);
                } catch (error) {
                    console.error('Fetch error:', error);
                    setError('Failed to fetch data. Please try again later.');
                }
            } else {
                console.log('No user detected.');
                setError('You need to sign in first!');
            }
        };
    
        fetchData();
    }, [user]);

    return (
        <div className='mainPageContainer' style={{ maxWidth: "800px", margin: "auto", padding: "10px" }}>
            {error && (
                <h3 style={{ fontFamily: "Bahnschrift", fontWeight: "bold", width: "100%", textAlign: "center", marginTop: "50px" }}>
                    {error}
                </h3>
            )}
            {user && data && data.length > 0 ? (
                <>
                    <h3 style={{ fontFamily: "Bahnschrift", fontWeight: "bold", width: "100%", textAlign: "center", marginTop: "50px" }}>
                        Watchlist
                    </h3>
                    <Table style={{ maxWidth: "500px", margin: "auto", marginTop: "5px" }}>
                        <tbody>
                            {data.map((item, index) => (
                                <tr key={index}>
                                    <td style={{ border: "2px solid black", fontFamily: "Bahnschrift", fontWeight: "normal" }}>{index + 1}</td>
                                    <td style={{ border: "2px solid black", fontFamily: "Bahnschrift", fontWeight: "normal" }}>{item.title}</td>
                                    <td style={{ border: "2px solid black", fontFamily: "Bahnschrift", fontWeight: "normal" }}>{item.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </>
            ) : user && (
                <h3 style={{ fontFamily: "Bahnschrift", fontWeight: "bold", width: "100%", textAlign: "center", marginTop: "50px" }}>
                    You haven't added anything to your watchlist yet.
                </h3>
            )}
        </div>
    );
}

export default Watchlist;
