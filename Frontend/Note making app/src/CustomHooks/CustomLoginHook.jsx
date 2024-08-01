
import axios from 'axios'

import { useRecoilState , useResetRecoilState } from 'recoil'
import { loginState , loggedInState } from '../stateStore/authStore'
import { messageState } from '../stateStore/authStore';

export function useCustomLoginHook() {
  const[loginVal , setLoginVal] = useRecoilState(loginState);
  const[isloggedInVaL , setIsLoggedInVal] = useRecoilState(loggedInState);

  const [message , setMessage] = useRecoilState(messageState)
  const resetLoginState = useResetRecoilState(loginState);


  const updateLoginForm =  (e)=>{
    const{name , value} = e.target;
     setLoginVal((loginVal)=>({         
      
        ...loginVal,
        [name]:value,
      
    }))
   
  }

  const handleSubmit = async ()=>{
    //e.preventDefault();
    try{
   const res =  await axios.post("http://localhost:3000/login",loginVal,{
    withCredentials: true // Ensures cookies are sent with the request
  });
  console.log(res);
  if(res.data === 'OK'){
    setIsLoggedInVal(true);
  }else{
      setMessage("Wrong email or password");
  }
  

  resetLoginState();
}catch(err){
  console.log("error is in handleSubmit function  ",err);
}
}

const checkAuth = async()=>{
  try{
    await axios.get("http://localhost:3000/checkAuth",{withCredentials:true});

    setIsLoggedInVal(true);
  }catch(err){
    setIsLoggedInVal(false);
    console.log("error in checking login" , err)
  }
}
  

  



  return {
    loginVal,
    loginState,
    updateLoginForm,
    handleSubmit,
    checkAuth,
    message
  }
}

