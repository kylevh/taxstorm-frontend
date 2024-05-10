import { useState, useEffect } from 'react';
import { useAppSelector } from '../store/hooks';
import { decodeToken } from '../features/user';
import axios from 'axios'

function Profile() {
    const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
    const token = useAppSelector((state: any) => state.user.token);
    const userData = useAppSelector((state: any) => state.user.userData);
    const userId = useAppSelector((state: any) => state.user.userData.id); // Use the selector

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [ssn, setSSN] = useState('');

    const [profile, setProfile] = useState({
        userId: userData.id,
        firstName: userData.firstName,
        lastName: userData.lastName,
        address: userData.address,
        phoneNumber: userData.phoneNumber,
        role: userData.role,
    });
    const [editMode, setEditMode] = useState(false);
    console.log(profile);

    useEffect(() => {
        const decoded = decodeToken(token);
        setEmail(decoded.email);
        // setPassword(decoded.password);
    }, [token]);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/taxstorm/users/${userId}`, { headers: { Authorization: `Basic ${token}` } });
                setProfile(
                    { ...response.data, userId: userId }
                );
                setFirstName(response.data.firstName);
                setLastName(response.data.lastName);
                setEmail(response.data.email);
                setAddress(response.data.address);
                setPhoneNumber(response.data.phoneNumber);
                setSSN(response.data.ssn);
            } catch (error) {
                console.error('Failed to fetch credits', error);
            }
        };

        fetchUser();
    }, []);

    const handleUpdateUser = async () => {
        const updatedUserData = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            address: address,
            phoneNumber: phoneNumber,
            ssn: ssn
        };
        try {
            const response = await axios.put(`http://localhost:8080/taxstorm/users/${userId}`, updatedUserData, {
                headers: { Authorization: `Basic ${token}` }
            });
            console.log('User updated successfully', response.data);
        } catch (error) {
            console.error('Error updating user', error);
        }
    };

    // useEffect(() => {
    //     setProfile({
    //         userId: userData.id,
    //         firstName: profile.firstName,
    //         lastName: profile.lastName,
    //         address: profile.address,
    //         phoneNumber: profile.phoneNumber,
    //         role: userData.role,
    //     });
    // }, [userData]);

    // const handleChange = (e: any) => {
    //     const { name, value } = e.target;
    //     setProfile(prevProfile => ({
    //         ...prevProfile,
    //         [name]: value
    //     }));
        
    // }
    const toggleEditMode = () => {
        handleUpdateUser();
        setEditMode(!editMode);

    }
    console.log(userData);

    return (
        <div className="profile-container">
            <h1>{editMode ? 'Edit Profile' : 'Profile'}</h1>
            {editMode ? (
                <form>
                    <label>
                        First Name:
                        <input type="text" name="name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                    </label>
                    <label>
                        Last Name:
                        <input type="text" name="name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                    </label>
                    <label>
                        Address:
                        <input type="email" name="email" value={address} onChange={(e) => setAddress(e.target.value)} />
                    </label>
                    <label>
                        Phone Number:
                        <textarea name="bio" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                    </label>
                    <label>
                        SSN:
                        <input type="password" name="password" value={ssn} onChange={(e) => setSSN(e.target.value)} />
                    </label>
                    <button type="button" onClick={toggleEditMode}>Save</button>
                </form>
            ) : (
                <div>
                    <p><strong>ID:</strong> {userId}</p>
                    <p><strong>First Name:</strong> {firstName}</p>
                    <p><strong>Last Name:</strong> {lastName}</p>
                    <p><strong>Address:</strong> {address}</p>
                    <p><strong>Phone Number:</strong> {phoneNumber}</p>
                    {/* <p><strong>Email:</strong> {email}</p>
                    <p><strong>Password:</strong> {password}</p> */}
                    <button type="button" onClick={toggleEditMode}>Edit Profile</button>
                </div>
            )}
        </div>
    );
}

export default Profile;