import Terminal from './../components/TerminalWrapper/Terminal.jsx'
import ClockBar from './../components/ClockBar/ClockBar.jsx'
import NavBar from './../components/NavBar/NavBar.jsx'
import { useEffect, useState } from 'react'
import { useAnimation } from '../context/AnimationContext.jsx'

export default function Contact() {
    const {showAnimation, resetAnimation} = useAnimation();
    const animationState = showAnimation[1];

    useEffect(()=>{
        if(showAnimation[1])
        resetAnimation()
    }, [])

    return (
        <Terminal>
            <NavBar />
            <ClockBar section={"TRANSMISSION (Contact)"} />
            {animationState && (
            <div className="fade-in">
                <div className="wrapper">
                    <form className="contact-form">
                        <label>
                            <span className="label">Name:</span>
                            <input type="text" name="name" required />
                        </label>

                        <label>
                            <span className="label">Email:</span>
                            <input type="email" name="email" required />
                        </label>

                        <label>
                            <span className="label">Message:</span>
                            <textarea name="message" rows="8" required />
                        </label>

                        <div className="button-group">
                            <button type="submit">{"[SEND]"}</button>
                            <button type="button">{"[CANCEL]"}</button>
                        </div>
                    </form>
                </div>
            </div>
            )}
        </Terminal>
    );
}