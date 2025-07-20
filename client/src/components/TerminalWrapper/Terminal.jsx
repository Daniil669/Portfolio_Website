import './terminal.css'

export default function Terminal({ className = "", children }) {
  return (
    <section className={`terminal ${className}`}>
      <div className="terminal-scroll">
        {children}
      </div>
    </section>
  );
}

