import Terminal from './../components/TerminalWrapper/Terminal.jsx'
import ClockBar from './../components/ClockBar/ClockBar.jsx'
import NavBar from './../components/NavBar/NavBar.jsx'
import Card from '../components/Card/Card.jsx'
import { useEffect, useState } from 'react'
import { useAnimation } from '../context/AnimationContext.jsx'
import { services_api } from '../api/infoApi.js'
import Globe from '../assets/Globe.svg';
import Phone from '../assets/Phone.svg';
import Chain from '../assets/Chain.svg';
import Chart from '../assets/Chart.svg';
import Pencil from '../assets/Pencil.svg';

export default function Service() {
    const {showAnimation, resetAnimation} = useAnimation();
    const animationState = showAnimation[1];
    const [services, setServices] = useState({ services: [] })

    useEffect(()=>{
        async function fetchData() {
            const data = await services_api();
            setServices(data)
        };
        fetchData()
    }, [])

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
                    {services?.services?.map((item, index)=>{
                          const iconMap = {
                            "Full-Stack Web Development": Globe,
                            "Mobile App Prototyping": Phone,
                            "API Integration & Backend Logic": Chain,
                            "Agile-Ready Workflow": Chart,
                            "MVP / Prototype Building": Pencil,
                        };
                        return <Card key={index} data={item} icon={iconMap[item.title]} />
                    })}
                </div>
            </div>
            )}
        </Terminal>
    );
}