import Table from 'react-bootstrap/Table';
import UserContext from '../contexts/userContext';
import { useContext, useState, useEffect } from 'react';

async function sendDataToServer(user) {

    const pls = JSON.stringify({"userId": user.name})

    try {
        const response = await fetch('http://localhost:8000/profile', {
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

function UserProfile() {
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
        <div className='mainPageContainer' style={{ maxWidth: "800px", margin: "auto" }}>
            {error && (
                <h3 style={{ fontFamily: "Bahnschrift", fontWeight: "bold", width: "100%", textAlign: "center", marginTop: "50px" }}>
                    {error}
                </h3>
            )}
            {user && data && (
                <>
                    <h3 style={{ fontFamily: "Bahnschrift", fontWeight: "bold", width: "100%", textAlign: "center" }}>
                        Profile
                    </h3>
                    <img src={process.env.PUBLIC_URL + '/avatar.png'} style={{ height: "80px" }} alt="user avatar" />
                    <Table style={{ maxWidth: "400px", margin: "auto", marginTop: "50px" }}>
                        <tbody>
                            <tr>
                                <td style={{ border: "2px solid black", fontFamily: "Bahnschrift", fontWeight: "bold"}}>Name</td>
                                <td style={{ border: "2px solid black",fontFamily: "Bahnschrift", fontWeight: "bold" }}>{data.name}</td>
                            </tr>
                            <tr>
                                <td style={{ border: "2px solid black", fontFamily: "Bahnschrift", fontWeight: "bold" }}>Surname</td>
                                <td style={{ border: "2px solid black", fontFamily: "Bahnschrift", fontWeight: "bold" }}>{data.surname}</td>
                            </tr>
                            <tr>
                                <td style={{ border: "2px solid black", fontFamily: "Bahnschrift", fontWeight: "bold" }}>E-Mail</td>
                                <td style={{ border: "2px solid black", fontFamily: "Bahnschrift", fontWeight: "bold" }}>{data.email}</td>
                            </tr>
                            <tr>
                                <td style={{ border: "2px solid black",fontFamily: "Bahnschrift", fontWeight: "bold" }}>Role</td>
                                <td style={{ border: "2px solid black",fontFamily: "Bahnschrift", fontWeight: "bold" }}>{data.role}</td>
                            </tr>
                        </tbody>
                    </Table>
                </>
            )}
        </div>
    );
}

export default UserProfile;
