import Terminal from './../components/TerminalWrapper/Terminal.jsx'
import ClockBar from './../components/ClockBar/ClockBar.jsx'
import NavBar from './../components/NavBar/NavBar.jsx'
import { useEffect, useState, useRef } from 'react'
import { useAnimation } from '../context/AnimationContext.jsx'
import Card from '../components/Card/Card.jsx'
import { projects_api, freelance_project_api} from '../api/infoApi.js'
import { projects_info_api } from "../api/githubProjectsApi.js"
import Person from '../assets/Person.svg';
import GitHub from '../assets/GitHub.svg';
import SearchIcon from '../assets/SearchIcon.svg';
import '../components/Card/card.css';
import { Typewriter } from 'react-simple-typewriter'

export default function Projects() {
    const {showAnimation, resetAnimation} = useAnimation();
    const animationState = showAnimation[1];

    const [projecsSourceData, setProjectsSourceData] = useState({project_categories: []})
    const [projectsData, setProjectsData] = useState({})
    const [isSourceSelected, setIsSourceSelected] = useState("")

    useEffect(()=>{
        async function fetchData() {
            const data = await projects_api();
            setProjectsSourceData(data)
        }
        fetchData()
    }, [])

    const handleSouceSelect = async (sourceId) => {
            setIsSourceSelected(sourceId);
            console.log("click")
        if (sourceId === "Freelance Project") {
                const data = await freelance_project_api();
                setProjectsData(data);
        } else if (sourceId === "Personal Github") {
            const data = await projects_info_api("pers");
            setProjectsData(data);
        } else if (sourceId === "University Github") {
            const data = await projects_info_api("uni");
            setProjectsData(data);
        }
        }

    const handleBack = () => {
        setIsSourceSelected("");
        setProjectsData({});
    }

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
                    {isSourceSelected && 
                    <div className='subsection-wrapper'>
                        <div className="subsection-text">
                            <span className="subsection">
                                {isSourceSelected}
                            </span>
                        </div>
                        <div className='button-subsection'>
                            <button
                            onClick={() =>{
                                handleBack()
                            }}
                            >
                            {"[BACK]"}
                            </button>
                        </div>
                    </div>
                    }
                    {!isSourceSelected ? (projecsSourceData?.project_categories?.map((item, index)=>{
                        const iconMap = {
                            "Local Business Web Shop": Person,
                            "Personal Projects": GitHub,
                           "University Projects": GitHub,
                            "Coming Soon": SearchIcon
                        }
                        return (
                                <article key={index} className="card">
                                    <div className="icon-photo">
                                    <img src={iconMap[item.title]} alt="icon" />
                                    </div>
                                <div className="text-button">
                                    <div className="text">
                                    {item.title && <p className="title-card">{item.title}<span>:</span></p>}
                                    {item.description && 
                                        Array.isArray(item.description)
                                            ? item.description.map((d, i) => <p key={i} style={{marginTop: "10px"}} className="paragraph-card">{d}</p>)
                                            : <p style={{marginTop: "10px"}} className="paragraph-card">{item.description}</p>
                                    }
                                    </div>

                                    {(item.links?.source) && (
                                    <div className="button-group-card">
                                        {item.links.source && (
                                        <button style={{textTransform: "uppercase"}} id={item.links.source} onClick={(event)=>handleSouceSelect(event.target.id)}>
                                            {"["+item.links.source+"]"}
                                        </button>
                                        )}
                                    </div>
                                    )}
                                </div>
                                </article>
                        )
                        })
                    ):
                    (projectsData["data"]?.map((item, index) => {
                        return <Card key={index} data={item} icon={null} variant='github'/>
                    })
                    )}
                </div>
            </div>
            )}
        </Terminal>
    );
}