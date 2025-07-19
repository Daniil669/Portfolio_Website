import Terminal from './../components/TerminalWrapper/Terminal.jsx'
import ClockBar from './../components/ClockBar/ClockBar.jsx'
import NavBar from './../components/NavBar/NavBar.jsx'
import { useEffect, useState, useRef } from 'react'
import { useAnimation } from '../context/AnimationContext.jsx'
import ReCAPTCHA from 'react-google-recaptcha';
import { contact_api } from '../api/contactApi.js'

export default function Contact() {
    const {showAnimation, resetAnimation} = useAnimation();
    const animationState = showAnimation[1];

    const [captchaValue, setCaptchaValue] = useState(null);
    const [captchaAttempts, setCaptchaAttempts] = useState(0);
    const [coolDown, setCoolDown] = useState(null);
    const captchaRef = useRef();
    const MAX_CAPTCHA_ATTEMPTS = 3;

    const [isError, setIsError] = useState(false)
    const [nameInput, setNameInput] = useState("")
    const [emailInput, setEmailInput] = useState("")
    const [message, setMessage] = useState("")
    const [serverAnswer, setServerAnswer] = useState("")


    const handleCaptchaChange = (value) => {
        if (captchaAttempts >= MAX_CAPTCHA_ATTEMPTS){
            alert("Too many captcha attempts!")
            captchaRef.current?.reset();
            return;
        }
        setCaptchaAttempts(prev=>prev+1)
        setCaptchaValue(value);
    };

    useEffect(() => {
    if (serverAnswer) {
        const timeout = setTimeout(() => setServerAnswer(""), 8000);
        return () => clearTimeout(timeout);
    }
    }, [serverAnswer]);


    useEffect(() => {
        if (captchaAttempts >= MAX_CAPTCHA_ATTEMPTS) {
            setCoolDown(Date.now() + 10 * 60 * 1000); // 10 mins
        }
    }, [captchaAttempts]);

    useEffect(() => {
    if (!coolDown) return;

    const interval = setInterval(() => {
        if (Date.now() >= coolDown) {
            setCaptchaAttempts(0);
            setCaptchaValue(null);
            setCoolDown(null);
            captchaRef.current?.reset();
        }
    }, 1000); // check every second

        return () => clearInterval(interval);
    }, [coolDown]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {
            name: nameInput,
            email: emailInput,
            message: message,
            captchaToken: captchaValue
        }
        if (!captchaValue) {
            alert('Please complete the reCAPTCHA');
            return;
        }

        if (captchaAttempts >= MAX_CAPTCHA_ATTEMPTS) {
            alert("You've exceeded CAPTCHA attempts.");
            return;
        }

        if(!isError){
            const answer = await contact_api(data);
            setServerAnswer(answer);
            setCaptchaAttempts(0)
            setCoolDown(null)
            setNameInput("")
            setEmailInput("")
            setMessage("")
            setCaptchaValue(null)
            captchaRef.current?.reset();
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
        setIsError(false);
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
                    {serverAnswer ? <><p style={{color: "#00FF66", fontWeight: 'bold'}}>{serverAnswer}</p><button onClick={()=>{setServerAnswer("")}}>[OK]</button></> :
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
                        <div className='captchaWrapper'>
                        <ReCAPTCHA
                        ref={captchaRef}
                        sitekey={import.meta.env.VITE_SITE_KEY_DEV}
                        onChange={handleCaptchaChange}
                        />
                        </div>
                        <div className="button-group">
                            {coolDown && Date.now() < coolDown && (
                            <p style={{color: "orange"}}>You’ve reached the max reCAPTCHA attempts. Try again later.</p>
                            )}
                            <button type="submit" disabled={coolDown && Date.now() < coolDown}>{"[SEND]"}</button>
                            <button type="button" onClick={clearInputs}>{"[CANCEL]"}</button>
                        </div>
                    </form>
                    }
                </div>
            </div>
            )}
        </Terminal>
    );
}