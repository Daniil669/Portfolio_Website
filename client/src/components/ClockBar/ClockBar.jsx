import { useEffect, useState } from "react";
import { Typewriter } from 'react-simple-typewriter'
import './clockBar.css'
import { useAnimation } from "../../context/AnimationContext";

export default function ClockBar({section}) {
  const {showAnimation, setShowAnimation} = useAnimation();

  const handleCursor = () => {
      if (!showAnimation[1]) {
    setShowAnimation([false, true]);
  }
  };

  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1_000);
    return () => clearInterval(id);          // cleanup on unmount
  }, []);

  const timeStr = now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
     hour12: false
  });

  const dateStr = now.toLocaleDateString();

  return (
    <header className={`clock-bar`}>
      <div className="clock-time">
        <span className="date">{dateStr}</span>
        <span className="date-time-bar">|</span>
        <span className="time">{timeStr}</span>
      </div>

      <div className="clock-labels">
        <div className="title"><span className="arrow">{">"}</span>
        <span className="section">
          <Typewriter words={[section]}
          typeSpeed={35}
          cursor={showAnimation[0]}
          cursorStyle="_"
          onLoopDone={()=>{handleCursor()}}
          loop={1}
          />
          </span></div>
      </div>
    </header>
  );
}
