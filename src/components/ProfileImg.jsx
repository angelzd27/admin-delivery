import React, { useState } from 'react'

function ProfileImg({image_url}) {
    const [image, setImage] = useState(null);
  
    const handleImageChange = (e) => {
      const selectedImage = e.target.files[0];
      const imageUrl = URL.createObjectURL(selectedImage);
      setImage(imageUrl);
    };
  
    return (
      <div>
        <img
          className={`object-cover rounded-full lg:w-24 md:w-20 sm:w-16 w-16`}
          src={image || image_url}
          alt="Perfil"
        />
        <br />
        <input type="file" accept="image/*" onChange={handleImageChange} />
      </div>
    );
  }
  
  export default ProfileImg;
  
