import { projects_info_api } from "../../api/githubProjectsApi";
import { useState, useEffect } from "react";

export default function Home() {
    const [mediaUrl, setMediaUrl] = useState(null)
    const [data, setData] = useState({})

    useEffect(()=>{
    const fetchData = async () =>{
        const data_ = await projects_info_api("pers")
        console.log(data_)
        setData(data_)

    }
    fetchData()
    }, [])

    return (
        <>
        <h1>Home</h1>
        <img src={mediaUrl} alt="image" />
        </>
    );
}