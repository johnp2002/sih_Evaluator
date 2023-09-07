import React from "react";

export default function NextTeam(props){
    if(props.chk){

        props.chk(false);
    }
    return (
        <div className="next">
            <h2 className="cTtitle">Next Team</h2>
            <p className="teamID">Team ID : {props.d.ID}</p>
            <h1 className="cTname">{props.d.team_name}</h1>
            <h3 className="theme" style={{marginTop:'-5px'}}>Theme : {props.d.theme}</h3>
        </div>
    )
}