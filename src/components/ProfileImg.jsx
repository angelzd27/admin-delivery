import React, { useState } from 'react'

function ProfileImg({ image_url }) {
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    const imageUrl = URL.createObjectURL(selectedImage);
    setImage(imageUrl);
  };

  return (
    <div className='flex flex-col items-center justify-center'>
      <img
        className={`object-cover rounded-full lg:w-36 md:w-28 sm:w-24 w-20`}
        src={image || image_url}
        alt="Perfil"
      />
      <br />
      <input type="file" accept="image/*" onChange={handleImageChange} />
    </div>
  );
}

export default ProfileImg;

