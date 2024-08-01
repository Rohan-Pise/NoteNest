import axios from 'axios'

import { useRecoilState , useResetRecoilState } from 'recoil'
import { signupState  } from '../stateStore/authStore'
import { messageState } from '../stateStore/authStore';

export function useCustomSignUpHook() {

  const [signUp , setSignUp] = useRecoilState(signupState);

  const reSetSignUpForm = useResetRecoilState(signupState);

  const updateSignUpForm =  (e)=>{
    const{name , value} = e.target;
     setSignUp((signUp)=>({         
      
        ...signUp,
        [name]:value,
      
    }))
   
  }

  const handleSubmit = async ()=>{
    //e.preventDefault();
    
   const res =  await axios.post("http://localhost:3000/signup",signUp,{
    withCredentials: true // Ensures cookies are sent with the request
  });

  console.log(res.data);

  

  reSetSignUpForm();
 
}


  return {
    updateSignUpForm,
    handleSubmit,
    signUp,
    setSignUp,
  }
}


