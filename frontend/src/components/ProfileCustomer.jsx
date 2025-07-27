
import React, { useState } from 'react';
import '../styles/CustomerProfile.css';
import { FaTimes, FaCamera, FaUser, FaCar } from 'react-icons/fa';

export default function Profile({ onClose }) {
    const [profile, setProfile] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        address: '',
        photo: '',
        vehicleNumber: '',
        frontPhoto: '',
        backPhoto: '',
        leftPhoto: '',
        rightPhoto: '',
    });

    const [isEditing, setIsEditing] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const validateForm = () => {
        if (!profile.firstName.trim()) {
            setErrorMessage("First name is required");
            return false;
        }
        if (!profile.lastName.trim()) {
            setErrorMessage("Last name is required");
            return false;
        }
        if (!/^\+94[-\s]?\d{2}[-\s]?\d{3}[-\s]?\d{4}$/.test(profile.phone)) {
            setErrorMessage("Phone number must be in the format: +94 XX XXX XXXX");
            return false;
        }
        if (!profile.address.trim()) {
            setErrorMessage("Address is required");
            return false;
        }
        setErrorMessage('');
        return true;
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (files && files.length > 0) {
            const file = files[0];
            if (file && !file.type.startsWith("image/")) {
                setErrorMessage("Please upload a valid image file.");
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfile(prev => ({ ...prev, [name]: reader.result }));
            };
            reader.readAsDataURL(file);
        } else {
            setProfile(prev => ({ ...prev, [name]: value.trim() }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsEditing(false);
        console.log('Update Profile:', profile);
        //send to database
    };

    return (
        <>
            {errorMessage && (
                <div className='error-message'>{errorMessage}</div>
            )}
            <div className='profile-sidebar'>
                <button className="close-button" onClick={onClose}><FaTimes /></button>

                <div className="profile-photo-wrapper">
                    {profile.photo ? (
                        <img src={profile.photo} alt="Profile" className='profile-photo' />
                    ) : (
                        <div className="profile-photo">
                            <FaUser size={60} color="#6c757d" />
                        </div>
                    )}
                    {isEditing && (
                        <>
                            <label className="camera-icon-overlay" htmlFor="photo-upload">
                                <FaCamera />
                            </label>
                            <input
                                id="photo-upload"
                                type="file"
                                name="photo"
                                accept="image/*"
                                onChange={handleChange}
                                style={{ display: 'none' }}
                            />
                        </>
                    )}
                </div>

                {isEditing ? (
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <strong>First Name</strong>
                            <input
                                type="text"
                                name="firstName"
                                value={profile.firstName}
                                onChange={handleChange}
                                placeholder="Enter your first name"
                            />
                        </div>

                        <div className="form-group">
                            <strong>Last Name</strong>
                            <input
                                type="text"
                                name="lastName"
                                value={profile.lastName}
                                onChange={handleChange}
                                placeholder="Enter your last name"
                            />
                        </div>

                        <div className="form-group">
                            <strong>Phone</strong>
                            <input
                                type="text"
                                name="phone"
                                value={profile.phone}
                                onChange={handleChange}
                                placeholder="Enter phone number (+94 XX XXX XXXX)"
                            />
                        </div>

                        <div className="form-group">
                            <strong>Address</strong>
                            <textarea
                                name="address"
                                value={profile.address}
                                onChange={handleChange}
                                placeholder="Enter your complete address"
                                rows="3"
                            />
                        </div>

                        <div className="form-group">
                            <strong>Vehicle Number</strong>
                            <input
                                type="text"
                                name="vehicleNumber"
                                value={profile.vehicleNumber}
                                onChange={handleChange}
                                placeholder="Enter vehicle number (e.g., CA-1234)"
                            />
                        </div>

                        <div className="extra-photos-section">
                            <strong>Vehicle Photos</strong>
                            <div className="vehicle-photos-grid">
                                <div className="vehicle-photo-container">
                                    <label>Front View</label>
                                    <input
                                        type="file"
                                        name="frontPhoto"
                                        accept="image/*"
                                        onChange={handleChange}
                                        style={{ display: 'none' }}
                                        id="front-photo-upload"
                                    />
                                    <label htmlFor="front-photo-upload">
                                        {profile.frontPhoto ? (
                                            <img src={profile.frontPhoto} alt="Vehicle Front" className="vehicle-photo" />
                                        ) : (
                                            <div className="vehicle-photo placeholder-photo">
                                                <FaCar size={40} color="#6c757d" />
                                                <span>Upload front view</span>
                                            </div>
                                        )}
                                    </label>
                                </div>

                                <div className="vehicle-photo-container">
                                    <label>Back View</label>
                                    <input
                                        type="file"
                                        name="backPhoto"
                                        accept="image/*"
                                        onChange={handleChange}
                                        style={{ display: 'none' }}
                                        id="back-photo-upload"
                                    />
                                    <label htmlFor="back-photo-upload">
                                        {profile.backPhoto ? (
                                            <img src={profile.backPhoto} alt="Vehicle Back" className="vehicle-photo" />
                                        ) : (
                                            <div className="vehicle-photo placeholder-photo">
                                                <FaCar size={40} color="#6c757d" />
                                                <span>Upload back view</span>
                                            </div>
                                        )}
                                    </label>
                                </div>

                                <div className="vehicle-photo-container">
                                    <label>Left View</label>
                                    <input
                                        type="file"
                                        name="leftPhoto"
                                        accept="image/*"
                                        onChange={handleChange}
                                        style={{ display: 'none' }}
                                        id="left-photo-upload"
                                    />
                                    <label htmlFor="left-photo-upload">
                                        {profile.leftPhoto ? (
                                            <img src={profile.leftPhoto} alt="Vehicle Left" className="vehicle-photo" />
                                        ) : (
                                            <div className="vehicle-photo placeholder-photo">
                                                <FaCar size={40} color="#6c757d" />
                                                <span>Upload left view</span>
                                            </div>
                                        )}
                                    </label>
                                </div>

                                <div className="vehicle-photo-container">
                                    <label>Right View</label>
                                    <input
                                        type="file"
                                        name="rightPhoto"
                                        accept="image/*"
                                        onChange={handleChange}
                                        style={{ display: 'none' }}
                                        id="right-photo-upload"
                                    />
                                    <label htmlFor="right-photo-upload">
                                        {profile.rightPhoto ? (
                                            <img src={profile.rightPhoto} alt="Vehicle Right" className="vehicle-photo" />
                                        ) : (
                                            <div className="vehicle-photo placeholder-photo">
                                                <FaCar size={40} color="#6c757d" />
                                                <span>Upload right view</span>
                                            </div>
                                        )}
                                    </label>
                                </div>
                            </div>
                        </div>

                        <button type="submit" className="save-button">Save Changes</button>
                    </form>
                ) : (
                    <div className="profile-info">
                        <p>
                            <strong>Name:</strong>
                            {profile.firstName && profile.lastName ? `${profile.firstName} ${profile.lastName}` : 'Not set'}
                        </p>
                        <p>
                            <strong>Phone:</strong>
                            {profile.phone || 'Not set'}
                        </p>
                        <p>
                            <strong>Address:</strong>
                            {profile.address || 'Not set'}
                        </p>
                        <p>
                            <strong>Vehicle Number:</strong>
                            {profile.vehicleNumber || 'Not set'}
                        </p>

                        <div className="extra-photos-section">
                            <strong>Vehicle Photos</strong>
                            <div className="vehicle-photos-grid">
                                <div className="vehicle-photo-container">
                                    <label>Front View</label>
                                    {profile.frontPhoto ? (
                                        <img src={profile.frontPhoto} alt="Vehicle Front" className="vehicle-photo" />
                                    ) : (
                                        <div className="vehicle-photo placeholder-photo">
                                            <FaCar size={40} color="#6c757d" />
                                            <span>No photo</span>
                                        </div>
                                    )}
                                </div>
                                <div className="vehicle-photo-container">
                                    <label>Back View</label>
                                    {profile.backPhoto ? (
                                        <img src={profile.backPhoto} alt="Vehicle Back" className="vehicle-photo" />
                                    ) : (
                                        <div className="vehicle-photo placeholder-photo">
                                            <FaCar size={40} color="#6c757d" />
                                            <span>No photo</span>
                                        </div>
                                    )}
                                </div>
                                <div className="vehicle-photo-container">
                                    <label>Left View</label>
                                    {profile.leftPhoto ? (
                                        <img src={profile.leftPhoto} alt="Vehicle Left" className="vehicle-photo" />
                                    ) : (
                                        <div className="vehicle-photo placeholder-photo">
                                            <FaCar size={40} color="#6c757d" />
                                            <span>No photo</span>
                                        </div>
                                    )}
                                </div>
                                <div className="vehicle-photo-container">
                                    <label>Right View</label>
                                    {profile.rightPhoto ? (
                                        <img src={profile.rightPhoto} alt="Vehicle Right" className="vehicle-photo" />
                                    ) : (
                                        <div className="vehicle-photo placeholder-photo">
                                            <FaCar size={40} color="#6c757d" />
                                            <span>No photo</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <button onClick={() => setIsEditing(true)} className="edit-button">Edit Profile</button>
                    </div>
                )}
            </div>
        </>
    );
}