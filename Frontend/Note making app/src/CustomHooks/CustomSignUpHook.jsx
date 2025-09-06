import axios from 'axios'
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
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

  const handleSubmit = async () => {
  try {
    await axios.post(`${API_BASE_URL}/signup`, signUp, {
      withCredentials: true, // Ensures cookies are sent with the request
    });

    reSetSignUpForm();
    return { success: true }; // optional, to indicate success
  } catch (err) {
    if (err.response && err.response.data && err.response.data.msg) {
      reSetSignUpForm();
      return { success: false, message: err.response.data.msg };
    } else {
      return { success: false, message: "Something went wrong!" };
    }
  }
};


  return {
    updateSignUpForm,
    handleSubmit,
    signUp,
    setSignUp,
  }
}


