import { about } from "../../api/infoApi";
import { useState, useEffect } from "react";

export default function Home() {
    useEffect(()=>{
        about()
    }, [])
    return (
        <h1>Home</h1>
    );
}