import React from "react";
import logo from './assets/logoC.png'
import sih from './assets/sih.png'
import { Link } from "react-router-dom";

export default function Footer(){
    return (
        <div>

            
            <div className="footer">
                <p>Copyright © 2023 Prasad V Potluri Siddhartha Insititue of Technology - Developed by 
                <Link to={{ pathname: "https://www.linkedin.com/in/patchala-john-a62184251/" }} 
                    target="_blank">John 21505A0515
                </Link> 

                 </p>
            </div>
        </div>
    )
}