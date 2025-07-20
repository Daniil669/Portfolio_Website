import './dimWrapper.css'

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

