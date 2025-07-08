import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import { loadEmittersPlugin } from "tsparticles-plugin-emitters";
import './starField.css'
/**
 * Props
 *  active - show / hide the canvas (false on boot, loading, 404)
 *  className - optional extra class names
 */
export default function Starfield({ active = true, className = "" }) {
  // load only the lightweight preset
  const init = useCallback(async (engine) => {
    await loadSlim(engine);
    await loadEmittersPlugin(engine);
  }, []);

  // slow, subtle fly-through config
  const options = {
    background: { color: "transparent" },
    fullScreen: { enable: true },
    fpsLimit: 60,
    particles: {
      number: { value: 0 },              // emitters handle creation
      color: { value: "#ffffff" },
      shape: { type: "circle" },
      opacity: {
        value: { min: 0.3, max: 0.9 },
        animation: {
          enable: true,
          startValue: "max",
          destroy: "min",
          speed: 1.2,
        },
      },
      size: {
        value: { min: 0.15, max: 5 },
        animation: {
          enable: true,
          startValue: "min",
          destroy: "max",
          speed: 2,
        },
      },
      move: {
        enable: true,
        direction: "none",               // outward in all directions
        speed: { min: 5, max: 7 },     // adjust for taste
        straight: false,
        outModes: { default: "destroy" },// remove when off-screen
      },
    },

    /* ⭐ the magic: spawn at centre, fly outwards */
    emitters: {
      direction: "none",
      position: { x: 50, y: 50 },        // centre of canvas
      rate: { delay: 0.03, quantity: 3 },// spawn rate
      size: { width: 0, height: 0 },     // point emitter
      life: { count: 2 },                // live forever (continuous)
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

