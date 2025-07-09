import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Typewriter } from 'react-simple-typewriter'
import './clockBar.css'
import { useAnimation } from "../../context/AnimationContext";

/**
 * Props
 *  • section     (string)  – top-level page label, e.g. "ABOUT"
 *  • subsection  (string)  – optional secondary label
 *  • showBack    (bool)    – render ← button when true
 *  • backTarget  (string)  – path for navigate(-1) fallback
 *  • className   (string)  – extra classes
 */

export default function ClockBar({
  section,
  subsection = "",
  showBack = false,
  backTarget = -1,          // default: history back
  className = "",
}) {

  const navigate = useNavigate();

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
    <header className={`clock-bar ${className}`}>
      {/* back button (left) */}
      {showBack && (
        <button
          className="back-btn"
          onClick={() =>
            typeof backTarget === "number"
              ? navigate(backTarget)
              : navigate(backTarget)
          }
          aria-label="Go back"
        >
          {"[BACK]"}
        </button>
      )}

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
  
        {subsection && <span className="subsection"><Typewriter
          words={[subsection]}
          typeSpeed={35}
          cursor
          cursorStyle="_"
        /></span>}
      </div>

    </header>
  );
}
