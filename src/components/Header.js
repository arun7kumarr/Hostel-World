import React, { useContext, useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';
import {Link} from 'react-router-dom';
import { Appstate } from '../App';

const Header = () => {
    const useAppstate = useContext(Appstate);
    const [logOut,setLogOut] = useState(false);

  return (
    <div className='sticky top-0 z-10 bg-blue-400  items-center flex justify-between  text-red-500 font-bold p-3 border-b-2 border-gray-500'>

     <Link to='/'> <span><span className='text-white text-2xl'> Home</span></span></Link>
     <Link to='/'> <span className='text-3xl text-gray-9g00'>Hostel <span className='text-white text-3xl'> World</span></span></Link>
     {useAppstate.login? 
     <>
      <Link to='/addmovie' ><h1 className='text-lg flex items-center text-white cursor-pointer'> <Button ><AddIcon className='mr-1'/><span className='text-white'> Add New Hostel </span></Button></h1></Link>
      </>
      :
      <Link to='/login' ><h1 className='text-lg rounded-lg flex bg-indigo-500 items-center text-white cursor-pointer'> <Button c ><span className='text-white text-lg rounded-sm font-medium capitalize'> Login</span></Button></h1></Link>
     }
    </div>
  )
}

export default Header
