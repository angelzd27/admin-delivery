import { Link } from 'react-router-dom'
import { MdHomeFilled } from 'react-icons/md'

export default function NotFound() {
    return (
        <>
            <div className='flex flex-col items-center justify-center w-screen h-screen bg-yummy-800 text-white gap-4'>
                <h1 className='lg:text-8xl md:text-8xl sm:text-5xl text-4xl font-mono'>[ 404 ]</h1>
                <span className='font-mono text-center'>We Can't Find That Page</span>
                <span className='font-mono text-center'>Sorry, the page you are looking for doesn't exist or has been moved.</span>
                <Link to='/home/dashboard' className='flex items-center justify-center gap-2 font-mono border border-wihite py-2 px-5 hover:bg-yummy-600 hover:text-white transition-colors duration-300'>
                    <MdHomeFilled />
                    Go To Home
                </Link>
            </div>
        </>
    )
}