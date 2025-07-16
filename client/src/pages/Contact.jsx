import Terminal from './../components/TerminalWrapper/Terminal.jsx'
import ClockBar from './../components/ClockBar/ClockBar.jsx'
import NavBar from './../components/NavBar/NavBar.jsx'
import { useEffect, useState } from 'react'
import { useAnimation } from '../context/AnimationContext.jsx'
import ReCAPTCHA from 'react-google-recaptcha';

export default function Contact() {
    const {showAnimation, resetAnimation} = useAnimation();
    const animationState = showAnimation[1];

    const [captchaValue, setCaptchaValue] = useState(null);

    // TODO
    // 1. Set limits for captcha; 2. Clear all the fields when submitted; 3. Display message if success or failer from backend

    const handleCaptchaChange = (value) => {
        setCaptchaValue(value);
    };

    const [isError, setIsError] = useState(false)
    const [nameInput, setNameInput] = useState("")
    const [emailInput, setEmailInput] = useState("")
    const [message, setMessage] = useState("")

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = {
            name: nameInput,
            email: emailInput,
            message: message,
            captchaTocken: captchaValue
        }
        if (!captchaValue) {
            alert('Please complete the reCAPTCHA');
        }
        if(!isError){
            console.log(`${JSON.stringify(data)}`)
        }
        
    }

    const handleNameInput = (event) => {
        const nameExcludeChar=/^[\p{L}\s'-]+$/u;
        let m = event.target.value
        if(!nameExcludeChar.test(m) && m!=="") {
            setIsError(true)
        } else {
            setIsError(false)
        }
        setNameInput(m)
    }

    const clearInputs = () => {
        setNameInput("");
        setEmailInput("");
        setMessage("");
    }


    useEffect(()=>{
        if(showAnimation[1]) {
            resetAnimation()
        }
    }, [])

    return (
        <Terminal>
            <NavBar />
            <ClockBar section={"TRANSMISSION (Contact)"} />
            {animationState && (
            <div className="fade-in">
                <div className="wrapper">
                    <form className="contact-form" onSubmit={handleSubmit}>
                        <label>
                            <span className="label">Name:</span>
                            <input onChange={handleNameInput} value={nameInput} type="text" name="name" minLength="2" maxLength="50"
                            required />
                            {isError && <p style={{color: "red"}}>Only letters, hyphens, apostrophes, and spaces allowed</p>}
                        </label>

                        <label>
                            <span className="label">Email:</span>
                            <input onChange={(e) => setEmailInput(e.target.value)} value={emailInput} minLength="2" type="email" name="email" maxLength="100" required />
                        </label>

                        <label>
                            <span className="label">Message:</span>
                            <textarea name="message" value={message} onChange={(e) => setMessage(e.target.value)} rows="8" minLength="100" maxLength="700" required />
                            <p>{message.length}/700</p>
                        </label>
                        <ReCAPTCHA 
                        sitekey={import.meta.env.VITE_SITE_KEY_DEV}
                        onChange={handleCaptchaChange}
                        />
                        <div className="button-group">
                            <button type="submit">{"[SEND]"}</button>
                            <button type="button" onClick={clearInputs}>{"[CANCEL]"}</button>
                        </div>
                    </form>
                </div>
            </div>
            )}
        </Terminal>
    );
}