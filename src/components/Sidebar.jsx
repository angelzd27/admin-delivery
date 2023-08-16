import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { MdDashboard, MdAdminPanelSettings, MdPerson, MdHelp, MdMenu, MdMenuOpen, MdMail, MdPhone, MdLogout, MdDescription, MdSettingsAccessibility } from 'react-icons/md'
import { removeJWT } from '../services/jwt'

function Sidebar() {
    const [showMenu, setShowMenu] = useState(false)
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    const image_url = 'https://th.bing.com/th/id/R.eecf01ce2268ef8843815048bf2b3561?rik=00vIjP0S7WYVeA&pid=ImgRaw&r=0'
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
                <div className='flex flex-col items-center justify-center p-8 gap-3 h-[30vh]'>
                    <img
                        className={`object-cover rounded-full lg:w-24 md:w-20 sm:w-16 w-16`}
                        src={image_url} />
                    <h1
                        className='text-2xl font-bold flex items-center gap-2'>
                        <MdPerson />
                        DeicideSuici
                    </h1>

                    {/* Nota: Cambiar el color de la etiqueta Spam una vez quse se haya decidido el color */}
                    <span
                        className='bg-yummy-800 py-2 px-5 rounded-full flex items-center gap-2'>
                        <MdAdminPanelSettings />
                        Admin
                    </span>
                </div>

                {/* Navigation */}
                <div className='bg-yummy-800 p-8 rounded-tr-[100px] h-[70vh] flex flex-col justify-between gap-8'>
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
                            <MdDescription />
                            Dishes
                        </Link>

                        <Link
                            to='/home/my_profile'
                            className='flex items-center gap-4 text-white py-2 px-4 rounded-xl hover:bg-yummy-600 transition-colors lg:text-sm'>
                            <MdSettingsAccessibility />
                            My Profile
                        </Link>
                        <Link
                            onClick={() => { removeJWT() }}
                            to='/auth'
                            className='flex items-center gap-4 text-white py-2 px-4 rounded-xl hover:bg-yummy-600 transition-colors lg:text-sm'>
                            <MdLogout />
                            Logout
                        </Link>
                    </nav>
                    <div className='bg-yummy-600 text-black p-4 rounded-xl flex flex-row gap-4 items-center'>
                        <div>
                            <MdHelp className='w-5 h-5' />
                        </div>
                        <div>
                            <p className='text-sm mb-2'>Having troubles?</p>
                            <button className='font-bold text-md flex flex-row gap-2 items-center underline underline-offset-3' onClick={handleClickOpen}>
                                Contact Us !
                            </button>
                            <Dialog
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                            >
                                <DialogTitle className='bg-yummy-800 text-white'>
                                    <h1>Contact Support</h1>
                                </DialogTitle>
                                <DialogContent className='bg-yummy-800'>
                                    <DialogContentText className='flex flex-col gap-2'>
                                        <span className='text-white'>We do our best to improve the Admins website, your support helps us improve every day !</span>
                                        <a href='' className='flex items-center gap-2 underline underline-offset-4 text-white'>
                                            <MdMail />
                                            yummy.go@support.mx
                                        </a>
                                        <a href='' className='flex items-center gap-2 underline underline-offset-4 text-white'>
                                            <MdPhone />
                                            +52 1 415 100 1010
                                        </a>
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions className='bg-yummy-800 text-white'>
                                    <button onClick={handleClose} className='py-2 px-5 underline underline-offset-4'>
                                        Thanks !
                                    </button>
                                </DialogActions>
                            </Dialog>
                        </div>
                    </div>
                </div>
            </div>

            {/* Button Mobile */}
            {
                windowWidth < 1280 ?
                    <button
                        className='fixed right-4 bottom-4 text-2xl bg-primary-900 p-3 rounded-full z-20'
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