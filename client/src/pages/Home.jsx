import Terminal from './../components/TerminalWrapper/Terminal.jsx'
import ClockBar from './../components/ClockBar/ClockBar.jsx'
import NavBar from './../components/NavBar/NavBar.jsx'
import './styles.css'

export default function Home() {
    return (
        <Terminal>
            <ClockBar section={"MAIN TERMINAL (Home)"} />
            <div className="wrapper">
            <div className='title-subtitle-container'>
            <div className='title'>
                <h1>Daniil</h1>
                <h1>Shchennikov</h1>
            </div>
            <div className='subtitle'>
                <h2>Software Engineer</h2>
                <h2>&</h2>
                <h2>Tech Enthusiast</h2>
            </div>
            </div>
            </div>
            <NavBar />
        </Terminal>
    );
}