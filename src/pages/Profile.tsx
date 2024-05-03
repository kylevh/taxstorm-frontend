import React, { useState } from 'react';

function Profile() {
    const [profile, setProfile] = useState({
        name: 'Kyle Huynh',
        email: 'khuynh@skillstorm.com',
        bio: 'Hello! This is a placeholder bio for editing purposes!'
    });
    const [editMode, setEditMode] = useState(false);

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

    return (
        <div className="profile-container">
            <h1>{editMode ? 'Edit Profile' : 'Profile'}</h1>
            {editMode ? (
                <form>
                    <label>
                        Name:
                        <input type="text" name="name" value={profile.name} onChange={handleChange} />
                    </label>
                    <label>
                        Email:
                        <input type="email" name="email" value={profile.email} onChange={handleChange} />
                    </label>
                    <label>
                        Bio:
                        <textarea name="bio" value={profile.bio} onChange={handleChange} />
                    </label>
                    <button type="button" onClick={toggleEditMode}>Save</button>
                </form>
            ) : (
                <div>
                    <p><strong>Name:</strong> {profile.name}</p>
                    <p><strong>Email:</strong> {profile.email}</p>
                    <p><strong>Bio:</strong> {profile.bio}</p>
                    <button type="button" onClick={toggleEditMode}>Edit Profile</button>
                </div>
            )}
        </div>
    );
}

export default Profile;