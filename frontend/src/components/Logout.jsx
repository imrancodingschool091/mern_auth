import React from 'react'
import { logoutUser } from '../features/auth/authSlice'
import { useDispatch } from 'react-redux'

function Logout() {
    const dispatch=useDispatch()

    const handleLogout=()=>{
        dispatch(logoutUser())
        

    }
  return (
    
    <div>
        <button onClick={handleLogout}>Logout</button>


    </div>
  )
}

export default Logout