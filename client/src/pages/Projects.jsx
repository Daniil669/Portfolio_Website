import Terminal from './../components/TerminalWrapper/Terminal.jsx'
import ClockBar from './../components/ClockBar/ClockBar.jsx'
import NavBar from './../components/NavBar/NavBar.jsx'
import { useEffect, useState } from 'react'
import { useAnimation } from '../context/AnimationContext.jsx'
import Card from '../components/Card/Card.jsx'
import { projects_api } from '../api/infoApi.js'

export default function Projects() {
    const {showAnimation, resetAnimation} = useAnimation();
    const animationState = showAnimation[1];

    const [projecsSourceData, setProjectsSourceData] = useState(null)

    useEffect(()=>{
        async function fetchData() {
            const data = await projects_api();
            setProjectsSourceData(data)
        }
        fetchData()
    }, [])

    useEffect(()=>{
        console.log(`projects sources: ${JSON.stringify(projecsSourceData)}`)
    }, [projecsSourceData])

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
                    
                </div>
            </div>
            )}
        </Terminal>
    );
}