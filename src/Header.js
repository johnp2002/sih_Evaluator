import React from "react";
import logo from './assets/logoC.png'
import sih from './assets/sih.png'

export default function Header(){
    return (
        <div className="header">
            <img src={logo} className="clLogo"/>
            <div>
                <h1 className="hTitle" style={{letterSpacing:'-1px'}}>Prasad V Potluri Institute of Technology :: Autonomous</h1>
                <h3 className="dTitle" style={{marginTop:'-10px', fontWeight:'100'}}>Department of Computer Science and Engineering</h3>
            </div>
            <img src={sih} className="siLogo" />
        </div>
    )
}