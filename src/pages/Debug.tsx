import  { useState, useEffect } from 'react';
import { useAppSelector } from '../store/hooks';
import axios from 'axios';

export default function Debug() {
    const [userData, setUserData] = useState(null);
    const userId = useAppSelector((state: any) => state.user.userData.id); // Use the selector
    const token = useAppSelector((state: any) => state.user.token);

    useEffect(() => {
        axios.get(`http://ec2-54-88-54-136.compute-1.amazonaws.com:8080/taxstorm/users/${userId}`, { headers: { Authorization: `Basic ${token}` } })
            .then(response => {
                setUserData(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.error('Failed to fetch user data', error);
            });
    }, [userId]);

    return (
        <div>
            <h1>User Data</h1>
            {userData ? (
                <pre>{JSON.stringify(userData, null, 2)}</pre>
            ) : (
                <p>No user data available</p>
            )}
        </div>
    );
}

