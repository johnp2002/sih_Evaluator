import React from "react";
export default function StudentList(props){
    const styles = {display:'flex',
    alignItems:"center",
    }
    
    const styleCom ={
    backgroundColor:'grey',
    backgroundColor:(props.com)&&"#8ac926"
}
const isCompleted = (props.d.status === 'completed');
    return (
        <div style={styleCom} className="StudentList">
            <div style={styles}>
                <p className="stuID">{props.d.ID}</p>
                <h3 className="stuTeam" >{props.d.team_name}</h3>
                <h4 className="stuTheme">{props.d.theme}</h4>
            </div>

            {isCompleted && <p className="sts">Qualified for Next Round</p>}
            {props.eval && (props.d.pos !== "curr") && <button className="mNxt" style={{ pointerEvents:(props.curr)?'':'none', backgroundColor:(props.curr)?'':'grey',textDecoration:(props.curr)? '' : 'line-through'}} onClick={()=>{ props.f(props.d)}}>Make Next</button>}
            {props.eval || isCompleted || (props.d.pos != 'curr') &&  <p className="sts">Pending</p>}
            {(props.d.pos === 'curr') && <p className="sts currE" >Current Team</p> }
        </div>
    )
}