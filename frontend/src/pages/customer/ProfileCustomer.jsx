import React, {useState} from 'react';
import { FaCamera } from 'react-icons/fa';
import '../../styles/CustomerProfile.css';
import { useNavigate } from 'react-router-dom';

export default function ProfileCustomer() {
    const navigate = useNavigate();

    const [profile, setProfile]=useState({
        firstName: 'John',
        lastName: 'Perera',
        phone: '+94 77 123 4567',
        address: 'No. 456, Main Street, Galle',
        photo: '/src/assets/profile.png'
    });

    const[isEditing,setIsEditing]=useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const validateForm = () =>{
        if (!profile.firstName.trim()){
            setErrorMessage("First name is required");
            return false;
        }
        if (!profile.lastName.trim()){
            setErrorMessage("Last name is required");
            return false;
        }
        if(!/^\+94[-\s]?\d{2}[-\s]?\d{3}[-\s]?\d{4}$/.test(profile.phone)){
            setErrorMessage("Phone number must be in the format: +94 XX XXX XXXX");
            return false;
        }
        if (!profile.address.trim()){
            setErrorMessage("Address is required");
            return false;
        }
        setErrorMessage('');
        return true;
    };
  

    const handleChange=(e)=>{
        const{name,value,files}=e.target;

        if(name==='photo'){
        const file=files[0];
        if(file && !file.type.startsWith("image/")){
            setErrorMessage("Please upload a valid image file.");
            return;
        }
            const reader=new FileReader();
            reader.onloadend=()=>{
                setProfile((prev)=>({...prev, photo:reader.result}));
            };
            reader.readAsDataURL(file);
        }
    else{
        setProfile((prev) => ({...prev,[name]:value.trim(),
        }));
    }

   
};

 const handleSubmit=(e)=>{
        e.preventDefault();
        if(!validateForm()) return;

        setIsEditing(false);
        console.log('Update Profile:',profile);
        //send to database
    };


return(
    <div className='customer-profile-page'>
        <div className='customer-profile-wrapper'>
            <div className="container py-4">
                {errorMessage && (
                    <div className='customer-error-message'>{errorMessage}</div>
                )}
                
                <div className="customer-profile-photo-wrapper">
                    <img src={profile.photo} alt="Profile" className='customer-profile-photo'/>
                    
                    {isEditing && (
                        <>
                            <label className="customer-camera-icon-overlay" htmlFor="photo-upload">
                                <FaCamera/>
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
                    <div className='customer-edit-form'>
                        <form onSubmit={handleSubmit}>
                            <input type="text" name="firstName" value={profile.firstName} onChange={handleChange} placeholder="First Name" />
                            <input type="text" name="lastName" value={profile.lastName} onChange={handleChange} placeholder="Last Name" />
                            <input type="text" name="phone" value={profile.phone} onChange={handleChange} placeholder="Phone" />
                            <textarea name="address" value={profile.address} onChange={handleChange} placeholder="Address" />
                            <button type="submit" className="customer-save-button">Save</button>
                        </form>
                    </div>
                ) : (
                    <div className='customer-profile-container'>
                        <p><strong>Name:</strong> {profile.firstName} {profile.lastName}</p>
                        <p><strong>Phone:</strong> {profile.phone}</p>
                        <p><strong>Address:</strong> {profile.address}</p>
                        <button onClick={() => setIsEditing(true)} className="customer-edit-button">Edit</button>
                    </div>
                )}
                
                {!isEditing && (
                    <button type="button" className="customer-back-to-dashboard" onClick={() => navigate('/customer-dashboard')}>
                         Back to Dashboard
                    </button>
                )}
            </div>
        </div>
    </div>
);
}