import axios from 'axios'
import React from 'react'
import{loggedInState} from "../stateStore/authStore"
import { useRecoilState } from 'recoil'

export function useLogoutHook() {
  const [isLoggedIn , setIsLoggedIn] = useRecoilState(loggedInState)
  async function logout(){
    
    await axios.get("http://localhost:3000/logout",{withCredentials:true});

    setIsLoggedIn(false);
    
  }
  return{
    logout,
  }
}

