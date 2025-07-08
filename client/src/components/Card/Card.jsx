import './card.css'
/**
 *  • variant     – string  → "about" | "project" | "service" | "error" … (adds BEM-style modifier class)
 *  • header      – node    → optional header content
 *  • footer      – node    → optional footer content (links / buttons)
 *  • className   – string  → extra classes
 *  • children    – node    → main body
 */
export default function Card({ variant = "default", header, footer, className = "", children }) {
  return (
    <article className={`card card--${variant} ${className}`}>
      {header && <header className="card-header">{header}</header>}

      <section className="card-body">
        {children}
      </section>

      {footer && <footer className="card-footer">{footer}</footer>}
    </article>
  );
}

