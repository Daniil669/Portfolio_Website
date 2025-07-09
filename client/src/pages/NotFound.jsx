import Terminal from './../components/TerminalWrapper/Terminal.jsx'
import ClockBar from './../components/ClockBar/ClockBar.jsx'
import { useEffect, useState } from 'react'
import { useAnimation } from '../context/AnimationContext.jsx'
import { NavLink } from 'react-router-dom';

export default function NotFound() {
        const {showAnimation, resetAnimation} = useAnimation();
        const animationState = showAnimation[1];
    
        useEffect(()=>{
            if(showAnimation[1])
            resetAnimation()
        }, [])
    return (
        <Terminal>
            <ClockBar section={"404"}/>
            {animationState && (
            <div className='fade-in'>
            <div style={{width: "89%", display: "flex", flexDirection: "column", gap: "35px", margin: "35px 0px"}}>
            
            <div>
                <p>{"FILE: /nonexistent-page.js"}</p>
                <p>{"STATUS: MISSION FAILED"}</p>
                <p>{"SUGGESTED ACTION: return to MAIN TERMINAL (HOME)"}</p>
            </div>
            <div>
                <NavLink to={"/"}>
                    {"[HOME]"}
                </NavLink>
            </div>
            </div>
            </div>)}
        </Terminal>
    );
}