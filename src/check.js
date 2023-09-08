import React from 'react';
import { useCookies } from 'react-cookie';
import sha256 from 'sha256';
import Evaulator from './Evaulator';
import App from './App';

function check() {
    const [cookies, setCookie] = useCookies(['name']);
    const adm = 'dd1fa9ccd5604d8d4f75a035ea570570e5242f40df502d774eda7b7f9af3e1d1';
    const [auth,setAuth] = React.useState(true)
   const [user,setUser] = React.useState('')
   const [enable,setEnable] = React.useState(false)
  const handleChange=(e)=>{
    setUser(e.target.value)
    setCookie('name', e.target.value);
  }
  const rem = ()=>{
    setEnable(false)
  }
  
  return (
    <div>
      { enable && 
      <div className='Login'>
        <p className='close' onClick={()=>{setEnable(false)}}>X</p>
          <p>Enter Evaluator Code</p>
          <input type='password' onChange={(e)=>{handleChange(e)}} value={user} />
      </div> }
        {(auth)?

        <>
            {(sha256(user) === adm)&&<></>}
            {/* <h1>{user}</h1> */}
            {(sha256(user) === adm) && <Evaulator disable = {setEnable}/>}
            {(sha256(user) === adm) || <App enable = {setEnable} />}
        </>

        : <></>
        }


    </div>
  );
}

export default check;