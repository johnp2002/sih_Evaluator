import React from 'react';
import { useCookies } from 'react-cookie';


function check() {
    const [cookies, setCookie] = useCookies(['name']);
   const [user,setUser] = React.useState('')
  const handleChange=(e)=>{
    setUser(e.target.value)
    setCookie('name', e.target.value);
  }

  return (
    <div>
        <input onChange={(e)=>{handleChange(e)}} value={user} />
        <h1>{user}</h1>
    </div>
  );
}

export default check;