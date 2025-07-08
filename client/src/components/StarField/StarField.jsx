import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import 
/**
 * Props
 *  active - show / hide the canvas (false on boot, loading, 404)
 *  className - optional extra class names
 */
function Starfield({ active = true, className = "" }) {
  // load only the lightweight preset
  const init = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  // slow, subtle fly-through config
  const options = {
    background: { color: "transparent" },
    fullScreen: { enable: false },           // size with CSS instead
    fpsLimit: 60,
    particles: {
      number: {
        value: 250,
        density: { enable: true, area: 1200 },
      },
      color: { value: "#ffffff" },
      shape: { type: "circle" },
      opacity: {
        value: 0.8,
        random: { enable: true, minimumValue: 0.5 },
      },
      size: {
        value: 1.5,
        random: { enable: true, minimumValue: 0.5 },
      },
      move: {
        enable: true,
        speed: 0.3,            // gentle drift
        direction: "none",
        warp: true,            // slight “depth” illusion
        straight: false,
        outModes: { default: "out" },
      },
    },
    detectRetina: true,
  };

  // don’t mount the canvas when not needed
  if (!active) return null;

  return (
    <div id="starfield" className={className}>
      <Particles id="tsparticles" init={init} options={options} />
    </div>
  );
}

export default Starfield;
