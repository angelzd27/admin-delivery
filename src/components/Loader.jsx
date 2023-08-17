import { useState } from 'react'
import YummyLogo from '../assets/images/YummyTransparent.png'

function Loader() {
    if (true) {
        return (
            <>
                <div className='w-screen h-screen bg-black bg-opacity-60 z-50 absolute select-none'>
                    <div className='flex flex-col items-center justify-center h-full w-full gap-12'>
                        <img src={YummyLogo} className='w-80 animate-ping animate-infinite animate-ease-out' />
                        <span className='text-2xl text-white'>Loading, please wait...</span>
                    </div>
                </div >
            </>
        )
    }

    return
}

export default Loader