import { useState, useEffect } from "react";

export default function Home() {
    const contact_data = {name: "John Smith", email: "john.smith@test.com", message: "Hello there!"}

    const clickHandler = async () => {
        const response = await contact_api(contact_data)
        console.log(response)
    }

    return (
        <>
        <h1>Home</h1>
        <button onClick={()=>clickHandler()}>Send message</button>
        </>
    );
}