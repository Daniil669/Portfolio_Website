import { cv_api } from "../../api/infoApi";
import { useState, useEffect } from "react";

export default function Home() {
    const [imgUrl, setImgUrl] = useState(null)
    const [data, setData] = useState({})

    useEffect(()=>{
    const fetchData = async () =>{
        const data_ = await cv_api()
        console.log(data_)
        setData(data_)

    }
    fetchData()
    }, [])

    return (
        <>
        <h1>Home</h1>
        <img src={imgUrl} alt="image" />
        </>
    );
}