import { useState, useEffect } from 'react'
import { TextField } from '@mui/material'
import { MdStar } from 'react-icons/md'

import { BiArrowFromBottom, BiSolidUserPlus } from 'react-icons/bi'
import { MdAdd } from 'react-icons/md'
import { Alert } from '@mui/material'
import { BD_ACTION_GET } from '../services/master'
import Loader from './Loader'
import { profileSearch } from '../services/profile'
import { useNavigate } from 'react-router-dom'
import ServerError from '../assets/animations/500Error.mp4'

const MenuComponent = () => {
  const navigate = useNavigate()
  const [load, setLoad] = useState(false)
  const [alert, setAlert] = useState(false)
  const [users, setUsers] = useState([])
  const [selectedButton, setSelectedButton] = useState(null)
  const [categorySelected, setCategorySelected] = useState(0)
  const [wathcMore, setWatchMore] = useState({})
  const [search, setSearch] = useState('')

  useEffect(() => {
    const get_data_profiles_users = async () => {
      try {
        setLoad(true)
        const data = await BD_ACTION_GET('user', 'get_users')
        if (!data.error) {
          console.log(data)
          setUsers(data.msg)
          setLoad(false)
        } else {
          console.error('No se pudo hacer la solicitud')
          setAlert(true)
          setTimeout(() => {
            setAlert(false)
          }, 5000);
        }
      } catch (error) {
        console.log(error)
        setAlert(true)
      }
    }

    get_data_profiles_users()
    setLoad(false)

    return () => { }

  }, [])

  const dataToDisplay = () => {
    if (selectedButton === null || selectedButton === 0) return users;

    const idTipoSeleccionado = profileSearch[selectedButton]['id_tipo'];
    const dataFilteredByIdTipo = users.filter(user => user.id_tipo === idTipoSeleccionado);

    return dataFilteredByIdTipo;
  }

  const profileSearch = [
    { id: 0, emoji: '👥', nombre: 'All', id_tipo: 0 },
    { id: 1, emoji: '🔑', nombre: 'Admin', id_tipo: 1 },
    { id: 2, emoji: '👤', nombre: 'Client', id_tipo: 2 },
    { id: 3, emoji: '💼', nombre: 'Employee', id_tipo: 3 },
  ];

  const handleClick = (index) => {
    setSelectedButton(index);
    if (index === 0) {
      // Si se hace clic en el botón "Todos", muestra todos los tipos (id_tipo: 0)
      setCategorySelected(0);
    } else {
      // De lo contrario, filtra por el id_tipo correspondiente al emoji seleccionado
      setCategorySelected(profileSearch[index].id_tipo);
    }
  }

  return (
    <>
      <Loader load={load} />
      <div className='w-full flex flex-col gap-6 mb-20 select-none'>
        <div className='flex justify-between'>
          <h1 className='text-2xl'>Users</h1>
          <button className='flex items-center justify-center gap-1 text-sm bg-yummy-800 text-white px-3 py-2 rounded-full hover:bg-yummy-600 transition-all shadow-lg' onClick={() => navigate('/home/sign_up')}>Add User <BiSolidUserPlus /></button>
        </div>
        <div className='flex flex-grow overflow-hidden'>
          <TextField className='flex-grow' variant='standard' placeholder='Search...' type='text' value={search} onChange={event => setSearch(event.target.value)} />
        </div>
        <div className='flex items-start'>
          {
            profileSearch.map((profile, index) => (
              <div key={index} className='flex flex-col items-center w-20 gap-1'>
                <span className={`w-12 h-12 flex items-center justify-center rounded-full transition-all duration-200 ${selectedButton === index ? 'bg-black scale-110 text-lg' : 'bg-yummy-600 hover:bg-black hover:scale-110 hover:text-lg hover:cursor-pointer'}`} onClick={() => { setCategorySelected(profile.id_tipo); handleClick(index) }}>{profile.emoji}</span>
                <span className='text-sm'>{profile.nombre}</span>
              </div>
            ))
          }
        </div>
        <div className='grid xl:grid-cols-4 lg:grid-cols-3 grid-cols-2 gap-8'>
          {
            dataToDisplay().filter(item => {
              if (item.nombre.toLowerCase().includes(search.toLowerCase())) {
                return true
              }
            }).map((user) => (

              <div key={user.id} className="w-full max-w-sm bg-white border border-gray-200 rounded-lg dark:bg-white dark:border-gray-700 shadow-md hover:scale-105 transition-all">


                <div className=' mb-2 '>

                  <div className="flex relative">
                    <h5 className="ml-3 mt-5 mb-1 text-xl font-medium text-gray-900 dark:text-black">{user.nombre}</h5>
                    <img className="ml-auto mr-3 mt-2 w-14 h-14 mb-3 rounded-full shadow-lg" src={user.foto} alt="Sin Imagen" />
                  </div>

                  <div className='flex flex-col'>
                    <span className="ml-3 text-sm text-gray-500 dark:text-gray-400">Usuario: {user.usuario} </span>
                    <span className="ml-3 text-sm text-gray-500 dark:text-gray-400">Perfil: {user.tipo}</span>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
        {
          alert && (
            <div className='w-full flex items-center justify-center flex-col gap-2'>
              <video loop autoPlay muted className='w-80'>
                <source src={ServerError} type='video/mp4' />
              </video>
              <h1 className='text-gray-500 text-xl'>Server Error</h1>
            </div>
          )
        }
      </div >
      {
        alert && (
          <Alert severity='error' className='absolute bottom-2 left-2 transition-all duration-300 z-50'>500 Server Error, Please comunicate with Developer</Alert>
        )
      }
    </>
  )
}

export default MenuComponent