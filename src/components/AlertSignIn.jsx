import { useEffect, useState } from 'react'

function AlertSignIn({textBig, textLittle, colorFondo, colorBorde, colorTexto, icono}) {
    const [dots, setDots] = useState(1)

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDots((prevDots) => (prevDots % 3) + 1)
        }, 500)

        return () => clearTimeout(timeout)
    }, [dots])


        return (
            <>
                <div className={`bg-green-400 border-t border-b border-l border-r border-green-600 text-center ml-7 py-3 animate-bounce fixed top-6 w-9/12 transform transition-transform duration-1000 ease-in-out`}>
               
               <div className='flex items-center justify-center'>

                {
                    icono ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    )
                }

              

                <p className="ml-3 font-bold">{textBig}</p>
               </div>
              
                    <p className="text-sm">{textLittle}</p>
                    
                </div>

            </>
        )
    
    
}

export default AlertSignIn