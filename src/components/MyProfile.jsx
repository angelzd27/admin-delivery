import { TextField } from "@mui/material"
import { useState } from "react";
import ProfileImg from "./ProfileImg"

function MyProfile() {
    const img_url = 'https://th.bing.com/th/id/R.eecf01ce2268ef8843815048bf2b3561?rik=00vIjP0S7WYVeA&pid=ImgRaw&r=0';

    const [formData, setFormData] = useState({
        firstName: 'Edwin',
        lastName: 'Reyes',
        secondLastName: 'Morales',
        phone: '4121005515',
        isoCode: '#####',
        dialCode: '#####',
        gender: 'Male',
        profile: 'Admin',
        username: 'EdwinKings11',
        password: '12345Ed$',
        email: 'reyesmorales56@gmail.com',
      });

    return (
        <>
            <div className='flex flex-col gap-6'>
                <h2 className='text-gray-500 text-xl font-bold text-center'>My Profile</h2>
            </div>

            <div className='flex flex-col gap-6 pt-6'>
                <h2 className='text-gray-500 text-xl font-bold text-center'>Edit your information</h2>
            </div>

                <div className="ml-6">

                    <div className='flex flex-col items-center gap-6 pt-6'>
                        <h1 className='text-l text-gray-500 font-bold'>Change your profile image</h1>
                        <ProfileImg image_url={img_url} />
                    </div>

                    <div className='grid grid-cols-2 gap-6 pt-6 pb-6'>
                        <TextField 
                        id="filled-basic" 
                        className=""
                        label="First Name"
                        placeholder={formData.firstName}
                        variant="filled" />
                        <TextField 
                        id="filled-basic"
                        className="" 
                        label="Last Name"
                        placeholder={formData.lastName}
                        variant="filled" />
                        <TextField 
                        id="filled-basic"
                        className="" 
                        label="Second Last Name"
                        placeholder={formData.secondLastName}
                        variant="filled" />
                        <TextField 
                        id="filled-basic"
                        className="" 
                        label="Phone"
                        placeholder={formData.phone}
                        variant="filled" />
                        <TextField 
                        id="filled-basic"
                        className="" 
                        label="ISO Code"
                        placeholder={formData.isoCode}
                        variant="filled" />
                        <TextField 
                        id="filled-basic"
                        className="" 
                        label="Dial Code"
                        placeholder={formData.dialCode}
                        variant="filled" />
                        <TextField 
                        disabled 
                        id="filled-basic"
                        className="" 
                        label={formData.gender}
                        variant="filled" />
                        <TextField 
                        disabled 
                        id="filled-basic"
                        className="" 
                        label={formData.profile} 
                        variant="filled" />
                        <TextField
                        id="filled-basic"
                        className=""
                        label="username"
                        placeholder={formData.username}
                        variant="filled" />
                        <TextField
                        disabled
                        id="filled-basic"
                        className=""
                        label={formData.email}
                        variant="filled" />
                        <TextField 
                        id="filled-basic"
                        className="" 
                        label="password" 
                        placeholder={formData.password}
                        variant="filled" />
                    </div>

                </div>


        </>
    )
}

export default MyProfile