import { useEffect, useState } from 'react'
import YummyLogo from '../assets/images/YummyTransparent.png'

function Loader(props) {
    const [dots, setDots] = useState(1)

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDots((prevDots) => (prevDots % 3) + 1)
        }, 500)

        return () => clearTimeout(timeout)
    }, [dots])

    if (props.load) {
        return (
            <>
                <div className='bg-black bg-opacity-60 z-50 fixed select-none left-0 top-0 w-full h-full'>
                    <div className='flex flex-col items-center justify-center h-full w-full gap-12'>
                        <img src={YummyLogo} className='w-80 animate-ping animate-infinite animate-ease-out' />
                        <span className='text-2xl text-white'>Loading, please wait{Array(dots).fill('.').join('')}</span>
                    </div>
                </div >
            </>
        )
    }

    return
}

export default Loader