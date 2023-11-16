import Dialog from '@mui/material/Dialog'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { MdDashboard, MdPerson, MdHelp, MdMenu, MdMenuOpen, MdMail, MdPhone, MdLogout, MdCategory } from 'react-icons/md'
import { BiSolidDish, BiSolidUserPlus } from 'react-icons/bi'
import { RiSettings3Fill } from 'react-icons/ri'
import { removeJWT, decodedDataJWT } from '../services/jwt'

function Sidebar() {
    const [showMenu, setShowMenu] = useState(false)
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    const [open, setOpen] = useState(false)

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth)
        }

        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    return (
        <>
            {/* Sidebar */}
            <div className={`bg-black text-white h-screen fixed shadow-md xl:left-0 w-[80%] xl:w-[15%] shadow-gray-600 z-10 transition-all duration-400 ${showMenu ? 'left-0' : '-left-full'}`}>

                {/* Profile Info */}
                <div className='flex flex-col items-center justify-center gap-4 h-[30vh]'>
                    <img
                        className={`object-cover rounded-full lg:w-20 md:w-20 sm:w-16 w-16 lg:h-20 md:h-20 sm:h-16 h-16`}
                        src={decodedDataJWT().picture} />
                    <h1
                        className='text-2xl font-bold flex items-center gap-2'>
                        <span className='w-2 h-2 bg-green-500 rounded-full'></span>
                        <MdPerson />
                        {decodedDataJWT().first_name}
                    </h1>
                    <span>Level: {decodedDataJWT().type_user_id == 1 ? 'Admin' : decodedDataJWT().type_user_id == 2 ? 'Client' : 'Employee'}</span>
                </div>

                {/* Navigation */}
                <div className='bg-yummy-800 p-8 rounded-tr-[100px] h-[70vh] flex flex-col justify-between gap-5'>
                    <nav className='flex flex-col gap-6'>
                        <Link
                            to='/home/dashboard'
                            className='flex items-center gap-4 text-white py-2 px-4 rounded-xl hover:bg-yummy-600 transition-colors lg:text-sm'>
                            <MdDashboard />
                            Dashboard
                        </Link>
                        <Link
                            to='/home/dishes'
                            className='flex items-center gap-4 text-white py-2 px-4 rounded-xl hover:bg-yummy-600 transition-colors lg:text-sm'>
                            <BiSolidDish />
                            Dishes
                        </Link>
                        <Link
                            to='/home/categories'
                            className='flex items-center gap-4 text-white py-2 px-4 rounded-xl hover:bg-yummy-600 transition-colors lg:text-sm'>
                            <MdCategory />
                            Categories
                        </Link>
                        <Link
                            to='/home/my_profile'
                            className='flex items-center gap-4 text-white py-2 px-4 rounded-xl hover:bg-yummy-600 transition-colors lg:text-sm'>
                            <RiSettings3Fill />
                            My Profile
                        </Link>
                        <Link
                            to='/home/sign_up'
                            className='flex items-center gap-4 text-white py-2 px-4 rounded-xl hover:bg-yummy-600 transition-colors lg:text-sm'>
                            <BiSolidUserPlus />
                            Sign Up
                        </Link>
                        <Link
                            onClick={() => { removeJWT() }}
                            to='/auth'
                            className='flex items-center gap-4 text-white py-2 px-4 rounded-xl hover:bg-yummy-600 transition-colors lg:text-sm'>
                            <MdLogout />
                            Logout
                        </Link>
                    </nav>
                    <div className='bg-yummy-600 text-black pt-2 pb-2 rounded-xl flex flex-row gap-4 items-center'>
                    
                        <div className='flex items-center gap-2 group'>
                            
                            <div className='group-hover:text-white group-hover:scale-105'>
                                <MdHelp className='ml-2 w-5 h-5 transition-all duration-300 ease-in-out transform' />
                            </div>
                            <button className='font-bold text-md flex flex-row gap-2 items-center transition-all duration-300 ease-in-out transform hover:text-white' onClick={handleClickOpen}>
                                Contact Us!
                            </button>

                            <Dialog
                                open={open}
                                onClose={handleClose}
                            >
                                <div className='bg-yummy-800 flex flex-col gap-4 p-6 text-white text-base/6'>
                                    <h1 className='text-3xl'>Contact Us</h1>
                                    <span>We do our best to improve the Admins website, your support helps us improve every day !</span>
                                    <a href='' className='flex items-center gap-2 underline underline-offset-4 '>
                                        <MdMail />
                                        yummy.go@support.mx
                                    </a>
                                    <a href='' className='flex items-center gap-2 underline underline-offset-4 '>
                                        <MdPhone />
                                        +52 1 415 100 1010
                                    </a>
                                    <button onClick={handleClose} className='text-right underline underline-offset-4'>
                                        Thanks !
                                    </button>
                                </div>
                            </Dialog>
                        </div>
                    </div>
                </div>
            </div>

            {/* Button Mobile */}
            {
                windowWidth < 1280 ?
                    <button
                        className='fixed right-4 bottom-4 text-2xl bg-primary-900 p-3 rounded-full z-20 text-yummy-800'
                        onClick={() => { setShowMenu(!showMenu) }}>
                        {
                            showMenu ? <MdMenuOpen /> : <MdMenu />
                        }
                    </button >
                    :
                    <></>
            }
        </>
    )
}

export default Sidebar