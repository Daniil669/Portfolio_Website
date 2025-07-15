import Terminal from './../components/TerminalWrapper/Terminal.jsx'
import ClockBar from './../components/ClockBar/ClockBar.jsx'
import NavBar from './../components/NavBar/NavBar.jsx'
import { useEffect, useState } from 'react'
import { useAnimation } from '../context/AnimationContext.jsx'
import Card from '../components/Card/Card.jsx'

export default function Projects() {
    const {showAnimation, resetAnimation} = useAnimation();
    const animationState = showAnimation[1];

    useEffect(()=>{
        if(showAnimation[1])
        {
            resetAnimation()
        }
        
    }, [])

    return (
        <Terminal>
            <NavBar />
            <ClockBar section={"MISSION DATABASE (Projects)"} />
            {animationState && (
            <div className="fade-in">
                <div className="wrapper">
                    <Card page={"projects"} data={""}/>
                </div>
            </div>
            )}
        </Terminal>
    );
}