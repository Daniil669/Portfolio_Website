import { useEffect, useState } from "react";
import '@/loader.css'
/**
 * Props
 *  • variant     – "boot" | "load"          (headline text)   ─ default "load"
 *  • durationMs  – total time 0→100 (ms)    (e.g. 8000)       ─ default 5000
 *  • className   – extra classes
 */
export default function Loader({ variant = "load", durationMs = 5000, className = "" }) {
  const baseText = variant === "boot" ? "BOOTING SYSTEM" : "LOADING MODULE";

  /* ---- headline ellipsis ---- */
  const [dots, setDots] = useState("");
  useEffect(() => {
    const dotsId = setInterval(
      () => setDots((d) => (d.length === 3 ? "" : d + ".")),
      450
    );
    return () => clearInterval(dotsId);
  }, []);

  /* ---- progress 0-100 ---- */
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const step = 100 / (durationMs / 50); // 50 ms interval
    const id = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(id);
          return 100;
        }
        return p + step;
      });
    }, 50);
    return () => clearInterval(id);
  }, [durationMs]);

  const perc = Math.floor(progress);

  return (
    <section className={`loader ${className}`} aria-label="System loader">
      {/* headline */}
      <h1 className="loader-head">
        {baseText}
        <span className="dots">{dots}</span>
      </h1>

      {/* progress bar */}
      <div className="progress-bar" role="progressbar" aria-valuenow={perc}>
        <div
          className="progress-fill"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* percentage text */}
      <div className="progress-text">{perc}%</div>
    </section>
  );
}

