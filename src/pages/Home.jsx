import Sidebar from '../components/Sidebar'


function Dashboard() {
    return (
        <>
            <div className='grid grid-cols-6 min-h-screen overflow-y-scroll'>
                <Sidebar />
            </div>
        </>
    )
}

export default Dashboard
