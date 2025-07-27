import React, {useState} from 'react';
import { FaCamera } from 'react-icons/fa';
import '../../styles/DriverProfile.css';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import StarRating from '../../components/StarRating';


    export default function ProfileDriver() {

        const navigate = useNavigate();

        const [profile, setProfile]=useState({
        firstName: 'John',
        lastName: 'Perera',
        phone: '+94 77 123 4567',
        age:28,
        experience:6,
        address: 'No. 456, Main Street, Galle',
        photo: '/src/assets/profile.png',
        ratings:3.0,
        earnings: 50000.00, 
        licenseFront:'/src/assets/licenseFront.jpg',
        licenseBack:'/src/assets/licenseBack.jpg',
        });

        const[isEditing,setIsEditing]=useState(false); 
        const [error, setError] = useState('');

    const validateForm = () =>{
        if (!profile.photo){
            setError("Profile photo is required");
            return false;
        }
        if (!profile.firstName.trim()){
            setError("First name is required");
            return false;
        }
        if (!profile.lastName.trim()){
            setError("Last name is required");
            return false;
        }
        if (!String(profile.experience).trim()){
            setError("Experience years are required");
        }
            if(parseInt(profile.experience)<5){
                setError("Experience should have more than 5 years");
            return false;
        }
        if(!/^\+94[-\s]?\d{2}[-\s]?\d{3}[-\s]?\d{4}$/.test(profile.phone)){
            setError("Phone number must be in the format: +94 XX XXX XXXX");
            return false;
        }
        if (!profile.address.trim()){
            setError("Address is required");
            return false;
        }
        if (!profile.licenseFront){
            setError("License front photo is required");
            return false;
        }  
        if (!profile.licenseBack){
            setError("License back photo is required");
            return false;
        }   
        setError('');
        return true;
    };
  

    const handleChange=(e)=>{
        const{name,value,files}=e.target;
        setError('');

        if(name==='photo'){
        const file=files[0];
        if(file && !file.type.startsWith("image/")){
            setError("Please upload a valid image file.");
            return;
        }
            const reader=new FileReader();
            reader.onloadend=()=>{
                setProfile((prev)=>({...prev, photo:reader.result}));
            };
            reader.readAsDataURL(file);
        }
    else{
        setProfile((prev) => ({...prev,[name]:value,
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
    <div className="driver-profile-sidebar">
    <div className='driver-profile-wrapper'>
        <div className="driver-back-arrow-container">
          <button className="driver-back-arrow-btn" onClick={() => navigate('/driver-dashboard')}>
            <FaArrowLeft />
          </button>
        </div>
  <div className="container py-4">

     {isEditing && error && (
            <div className="driver-error-message">{error}</div>
     
        )}
    
        <div className="driver-profile-photo-wrapper">
            
           <img src={profile.photo} alt="Profile" className='driver-profile-photo'/>
          
        {isEditing &&(
         <>
            <label className="driver-camera-icon-overlay" htmlFor="photo-upload">
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
         
         </div >
         
         {isEditing?(
            <div className='driver-edit-form'>
             <form onSubmit={handleSubmit} >
                <label>First Name:</label>
                <input type="text" name="firstName" value={profile.firstName} onChange={handleChange} placeholder="First Name" />
                <label>Last Name:</label>
                <input type="text" name="lastName" value={profile.lastName} onChange={handleChange} placeholder="Last Name" />
                 <label>Age:</label>
                <input type="text" name="age" value={profile.age} onChange={handleChange} placeholder="Age" />
                <label>Years of Experience:</label>
                <input type="text" name="experience" value={profile.experience} onChange={handleChange} placeholder="experience" />
                <label>Phone Number:</label>
                <input type="text" name="phone" value={profile.phone} onChange={handleChange} placeholder="Phone" />
                <label>Address:</label>
                <textarea name="address" value={profile.address} onChange={handleChange} placeholder="Address" />
                <label>License Front:</label>
                <div className="driver-license-photo-upload">
                    <img src={profile.licenseFront} alt="License Front" className="driver-license-photo" />
                    <input type="file" name="licenseFront" accept="image/*" onChange={handleChange} />
                </div>
                <label>License Back:</label>
                <div className="driver-license-photo-upload">
                    <img src={profile.licenseBack} alt="License Back" className="driver-license-photo" />
                    <input type="file" name="licenseBack" accept="image/*" onChange={handleChange} />
                </div>
                
                <div className="driver-button-right">
                <button type="submit" className="driver-save-button">Save</button>
                </div>
             </form>
             
          </div>   
    
        
        ):(
            
            <div className='driver-profile-container'>
                <p><strong>Name:</strong> {profile.firstName} {profile.lastName}</p>
                <p><strong>Age:</strong> {profile.age}</p>
                <p><strong>Phone Number:</strong> {profile.phone}</p>
                <p><strong>Address:</strong> {profile.address}</p>
                <p><strong>Years of Experience:</strong> {profile.experience} years</p>
                <p><div className='driver-rating-row'>
                    <strong>Ratings:</strong> <StarRating rating={profile.ratings} />
                   </div></p>
                <p><strong>Last Month’s Earnings:</strong> Rs. {profile.earnings.toLocaleString('en-LK', {minimumFractionDigits: 2})}</p>
                <p><div>
                    <strong>License Front:   </strong>
                    <img src={profile.licenseFront} alt="License Front" className="driver-license-photo" />
                   </div></p>
                <p><div>
                    <strong>License Back:   </strong>
                    <img src={profile.licenseBack} alt="License Back" className="driver-license-photo" />
                </div></p>

                <div className="driver-button-right">
                <button onClick={() => setIsEditing(true)} className="driver-edit-button">Edit</button>
                </div>
            </div> 
            
        )
    }
    </div> 
    
   </div>
   </div>

    
);
}