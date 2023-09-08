// App.js
import React, { useEffect, useState } from 'react';



import Header from './Header';
import CurrTeam from './CurrTeam';
import NextTeam from './NextTeam';
import StudentList from './StudentsList';
import Footer from './Footer';

import stroke from './assets/bStroke.png'
import stroke2 from './assets/stroke2.png'
import stroke3 from './assets/stroke3.png'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, onSnapshot } from "firebase/firestore";
import { doc, updateDoc } from "firebase/firestore"; 


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyARvbFHOcJLK49iy5E5nQuGMa-DdZD0jxQ",
  authDomain: "data-f5aa7.firebaseapp.com",
  projectId: "data-f5aa7",
  storageBucket: "data-f5aa7.appspot.com",
  messagingSenderId: "797582477966",
  appId: "1:797582477966:web:f88f70d3ff32ded60d57df"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);




function Evaulator(props) {
  const [data, setData] = useState([]);
  const [cnt,setCount] = useState(0);
  const [curr,setCurr] = useState(true);
  const [next,setNext] = useState(true);
  const Eval = true;
  const hov = {
    cursor: 'pointer',
    color:'white',
    backgroundColor:"green"
  }
  props.disable(false)
  

  useEffect(() => {
    // Create a reference to the Firestore collection you want to listen to
    // const collectionRef = collection(firestore,"Teams");
    
    // Set up the listener
    const unsubscribe = onSnapshot(collection(firestore,'Teams'),(snapshot) => {
        // console.log(snapshot)
      const updatedData = [];
      setCount(0);
      snapshot.forEach((doc) => {
        // Extract the data from each document
        // updatedData.push(doc.data());
        if(doc.data().status === 'completed'){
          setCount(cnt+1);
        }
          console.log(doc.id)
          updatedData.push({...doc.data(),id:doc.id});
      });
      // Update the state with the new data
      setData(updatedData);
      console.log(updatedData)
    });


    


    // Clean up the listener when the component unmounts
    return () => {
      unsubscribe();
    };
  }, []);

  const aTeam = async (obj)=>{ 

    setCurr(true);
    console.log('button clicked ateam Func')
    await updateDoc(doc(firestore, "Teams",obj.id), {status:'completed',pos:'' })
    console.log('button clicked ateam  end Func')
    // setCount(cnt+1)
    setCurr(true);

    // window.location.reload(false);
    return ;

  }
  const sTeam = async (obj)=>{ 

    setCurr(true);
    console.log('button clicked ateam Func')
    await updateDoc(doc(firestore, "Teams",obj.id), {pos:'',status:'skip' })
    console.log('button clicked ateam  end Func')
    // setCount(cnt+1)
    // window.location.reload(false);
    setCurr(true);
    return ;

  }

  const mkCurTeam = async (obj)=>{ 

    setCurr(false);
    setNext(true);
    console.log('button clicked ateam Func')
    await updateDoc(doc(firestore, "Teams",obj.id), {pos:'curr'})
    console.log('button clicked ateam  end Func')
    // setCount(cnt+1)
    // window.location.reload(false);
    // setCurr(true);
    setNext(true)
    return ;

  }

  const mkTeamNext = async (obj)=>{ 

    setNext(false)
    console.log('button clicked mkTeamNext Func')
    console.log(obj)
    await updateDoc(doc(firestore, "Teams",obj.id), {pos:'next'})
    // console.log('button clicked ateam  end Func')
    // setCount(cnt+1)
    // window.location.reload(false);
    // setCurr(true);
    setNext(false)
    return ;

  }

  
  return (
    <div className="App">

      <Header/>

      {/* <h1>Firestore Data</h1> */}
      {/* <ul>
        {data.map((item,idx) => (
          <li key={idx}>
            <p>{item.pos} team : </p>
            <strong>{item.team_name}:</strong>
            
          </li>
        ))}
      </ul> */}
      <div className='eTitle'>
        <h2>Evaluator of Ideathon Round-1 Status</h2>
      </div>
        <div className='TeamsWrapper'>
            <div>
                {curr && <h3 className='curr'>Current Team Not Yet Set!</h3>}
                {data.map((item,idx) => (
                        <>
                    {item.pos === 'curr' && <CurrTeam d={item} chk={setCurr} />}
                    {item.pos === 'curr' &&    
                        <div className='Ctrl'>
                            <button className='hov'  style={{backgroundColor:'white',color:'green',border:'2px solid green'}} onClick={()=>{aTeam(item);setCurr(true)}}>Accept</button>
                            <button className='nxtBtn' onClick={()=>{ sTeam(item); console.log('Skip Clicked'); setCurr(true)}} style={{cursor:'pointer' }}  >Skip Team</button>
                        </div>
                    }
                        </>
                ))}
                
            </div>
            <div>
            {next && <h3 className='next'>Next Team Not Yet Set!</h3>}
                {data.map((item,idx) => (
                    <>
                        {item.pos === 'next' && <NextTeam d={item} chk = {setNext} />}
                        {item.pos === 'next' && 
                            <div className='Ctrl'>
                                <button className='nxtBtn' onClick={()=>{console.log('Skip Clicked'); mkCurTeam(item); setNext(true);}} style={{cursor:(curr)? 'pointer':'not-allowed',textDecoration:(curr)?"": 'line-through' ,pointerEvents :(curr)? '':'none', backgroundColor:(curr)?'':'grey' ,width:'100%'}}>Make This Team Current!</button>
                            </div>
                        }
                    </>
                ))}
            </div>
        </div>
        <div className='StudentsWrapper' >
          {/* <h2 className='tTitle' style={{bgroundImage: `url(${stroke3})`}}ack>Teams Status</h2> */}
          <h2 className='tTitle' >Teams Status</h2>
          <div className="StudentList" style={{backgroundColor:'#00509d',color:'white'}}>
            <div style={{display:'flex',alignItems:'center'}}>
                <p className="stuID">Team ID</p>
                <h3 className="stuTeam" >Team Name</h3>
                <h4 className="stuTheme">Theme</h4>
            </div>
            <p>Status</p>
          </div>
            {data.map((item,idx) => (
                <>
                    {item.status === 'completed' && <StudentList elav={Eval} d={item} key={idx} com={true} />}
                </>
                ))}
            {data.map((item,idx) => (
                <>
                    {item.status != 'completed' && item.status != 'skip' && <StudentList eval={Eval} d={item} key={idx} curr={next} com={false} f={mkTeamNext} />}
                </>
                ))}
        </div>

        {/* <p>Total {cnt} Teams Completed </p> */}
        <Footer />
    </div>
  );
}



export default Evaulator;
