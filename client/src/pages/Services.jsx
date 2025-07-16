import Terminal from './../components/TerminalWrapper/Terminal.jsx'
import ClockBar from './../components/ClockBar/ClockBar.jsx'
import NavBar from './../components/NavBar/NavBar.jsx'
import { useEffect, useState } from 'react'
import { useAnimation } from '../context/AnimationContext.jsx'
import { services_api } from '../api/infoApi.js'

export default function Service() {
    const {showAnimation, resetAnimation} = useAnimation();
    const animationState = showAnimation[1];
    const [services, setServices] = useState(null)

    useEffect(()=>{
        async function fetchData() {
            const data = await services_api();
            setServices(data)
        };
        fetchData()
    }, [])

    useEffect(()=>{
        console.log(`Services: ${JSON.stringify(services)}`)
    },[services])

    useEffect(()=>{
        if(showAnimation[1])
        {
            resetAnimation()
        }
        
    }, [])

    return (
        <Terminal>
            <NavBar />
            <ClockBar section={"UTILITY MODULE (Service)"} />
            {animationState && (
            <div className="fade-in">
                <div className="wrapper">
                    
                </div>
            </div>
            )}
        </Terminal>
    );
}