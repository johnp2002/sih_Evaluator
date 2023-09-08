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
import { doc, setDoc } from "firebase/firestore"; 

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




function App(props) {
  const [data, setData] = useState([]);
  const [cnt,setCount] = useState(0);
  const [curr,setCurr] = useState(true);
  const [next,setNext] = useState(true);
  // const jsonData = require('./assets/dataSih.json')
  // console.log(jsonData)
  // const uploadJson =async ()=>{
  //   jsonData.forEach(element => {
  //     setDoc(doc(firestore, "Teams",element.ID), element)
  //   });

  // }
  // uploadJson()
  useEffect(() => {
    // Create a reference to the Firestore collection you want to listen to
    // const collectionRef = collection(firestore,"Teams");
    
    // Set up the listener
    const unsubscribe = onSnapshot(collection(firestore,'Teams'),(snapshot) => {
      const updatedData = [];
      setCount(0);
      setCurr(true)
      setNext(true)
      snapshot.forEach((doc) => {
        // console.log('snapshot called'+ doc)
        // console.log(doc)
        // Extract the data from each document
        // updatedData.push(doc.data());
          
          // console.log(doc.data())
          updatedData.push(doc.data());
          if(doc.data().pos === 'curr'){
            setCurr(false);
          }
          if(doc.data().pos === 'next'){
            setNext(false);
          }
      });
      // Update the state with the new data
      setData(updatedData);

      
    });

    // Clean up the listener when the component unmounts
    return () => {
      unsubscribe();
    };
  }, []);




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
        <h2>Dept of CSE - Ideathon Round-1 Status</h2> <button className='lBtn' onClick={()=>{props.enable(true)}}>Evaluator Login</button>
      </div>
        <div className='TeamsWrapper'>
        {curr && <h3 className='curr'>Current Team Not Yet Set!</h3>}
            {data.map((item,idx) => (
                  <>
                  {item.pos === 'curr' && <div><CurrTeam d={item} /></div>}
                  </>
                
              ))}
        {next && <h3 className='next'>Next Team Not Yet Set!</h3>}
        
            {data.map((item,idx) => (
                  <>
                  {item.pos === 'next' && <div><NextTeam d={item} /></div>}
                  </>
                
              ))}
        </div>
        <div className='StudentsWrapper'>
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
                {item.status === 'completed' && <StudentList d={item} key={idx} com={true} />}
            </>
              ))}
          {data.map((item,idx) => (
            <>
                {item.status != 'completed' && item.status != 'skip' &&<StudentList d={item} key={idx} com={false} />}
            </>
              ))}
        </div>

        {/* <p>Total {cnt} Teams Completed </p> */}
        <Footer />
    </div>
  );
}



export default App;
