import { useEffect, useState } from 'react'

function Sidebar() {
    const [showMenu, setShowMenu] = useState(false)
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    const image_url = 'https://th.bing.com/th/id/R.eecf01ce2268ef8843815048bf2b3561?rik=00vIjP0S7WYVeA&pid=ImgRaw&r=0'

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
            <div className={`bg-black text-white h-full fixed lg:static w-[80%] transition-all duration-400 ${showMenu ? 'left-0' : '-left-full'}`}>

                {/* Profile Info */}
                <div className='flex flex-col items-center justify-center p8 gap-2 h-[30vh]'>
                    <img
                        className='w-20 h-20 object-cover rounded-full'
                        src={image_url} />
                    <h1
                        className='text-xl font-bold'>
                        @DeicideSuici
                    </h1>

                    {/* Nota: Cambiar el color de la etiqueta Spam una vez quse se haya decidido el color */}
                    <span
                        className='bg-orange-400 py-1 px-3 rounded-full'>
                        Admin Level
                    </span>
                </div>

                {/* Navigation */}
                <div className='bg-orange-400 p-8 rounded-tr-[100px] h-[70vh] flex flex-col justify-between gap-8'>
                    <nav className='flex flex-col gap-6'>
                        <a
                            href=''
                            className='flex items-center gap-4 text-white py-2 px-4 rounded-xl hover:bg-orange-600 transition-colors'>
                            Home
                        </a>
                        <a
                            href=''
                            className='flex items-center gap-4 text-white py-2 px-4 rounded-xl hover:bg-orange-600 transition-colors'>
                            Link
                        </a>
                        <a
                            href=''
                            className='flex items-center gap-4 text-white py-2 px-4 rounded-xl hover:bg-orange-600 transition-colors'>
                            Link
                        </a>
                        <a
                            href=''
                            className='flex items-center gap-4 text-white py-2 px-4 rounded-xl hover:bg-orange-600 transition-colors'>
                            Link
                        </a>
                    </nav>
                    <div className='bg-orange-300 text-black p-4 rounded-xl'>
                        <p className='text-sm'>Having troubles?</p>
                        <a href='' className='font-bold text-md'>Contact Us</a>
                    </div>
                </div>
            </div>

            {/* Button Mobile */}
            {
                windowWidth < 1024 ?
                    <button
                        className='fixed right-4 bottom-4 text-2xl bg-primary-900 p-3 rounded-full'
                        onClick={() => { setShowMenu(!showMenu) }}>
                        ShowMenu
                    </button >
                    :
                    <></>
            }
        </>
    )
}

export default Sidebar