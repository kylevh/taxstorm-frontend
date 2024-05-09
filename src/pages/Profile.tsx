import React, { useState, useEffect } from 'react';
import { useAppSelector } from '../store/hooks';

function Profile() {
    const userData = useAppSelector((state: any) => state.loggedIn.userData);
    const [profile, setProfile] = useState({
        userId: userData.id,
        firstName: userData.firstName,
        lastName: userData.lastName,
        address: userData.address,
        phoneNumber: userData.phoneNumber,
        role: userData.role,
    });
    const [editMode, setEditMode] = useState(false);
    useEffect(() => {
        setProfile({
            userId: userData.id,
            firstName: userData.firstName,
            lastName: userData.lastName,
            address: userData.address ,
            phoneNumber: userData.phoneNumber,
            role: userData.role,
        });
    }, [userData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile(prevProfile => ({
            ...prevProfile,
            [name]: value
        }));
    }
    const toggleEditMode = () => {
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
                        <input type="text" name="name" value={profile.firstName} onChange={handleChange} />
                    </label>
                    <label>
                        Last Name:
                        <input type="text" name="name" value={profile.lastName} onChange={handleChange} />
                    </label>
                    <label>
                        Address:
                        <input type="email" name="email" value={profile.address} onChange={handleChange} />
                    </label>
                    <label>
                        Phone Number:
                        <textarea name="bio" value={profile.phoneNumber} onChange={handleChange} />
                    </label>
                    <button type="button" onClick={toggleEditMode}>Save</button>
                </form>
            ) : (
                <div>
                    <p><strong>ID:</strong> {profile.userId}</p>
                    <p><strong>First Name:</strong> {profile.firstName}</p>
                    <p><strong>Last Name:</strong> {profile.lastName}</p>
                    <p><strong>Address:</strong> {profile.address}</p>
                    <p><strong>Phone Number:</strong> {profile.phoneNumber}</p>
                    <button type="button" onClick={toggleEditMode}>Edit Profile</button>
                </div>
            )}
        </div>
    );
}

export default Profile;