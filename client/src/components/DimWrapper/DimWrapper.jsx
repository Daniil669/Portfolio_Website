import '@/dimWrapper.css'
/**
 * Props
 *  dim - Boolean; true ⇒ 60 % dark overlay, false ⇒ fully clear
 *  className - Optional extra class names
 *  children - Pages
 */
export default function DimWrapper({ dim = false, className = "", children }) {
  return (
    <div
      id="wrapper"
      className={`dim-wrapper ${dim ? "dimmed" : ""} ${className}`}
      data-dim={dim ? "true" : "false"}
    >
      {children}
    </div>
  );
}

