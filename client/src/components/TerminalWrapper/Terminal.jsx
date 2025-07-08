import '@/terminal.css'
/**
 * Wraps NavBar / ClockBar / Page Content inside the green-border “screen”.
 *
 * Props
 *  • className   – extra classes
 *  • children    – compose in desired order (NavBar, ClockBar, Cards, etc.)
 *
 * Typical usage (About page):
 *   <Terminal>
 *     <NavBar />
 *     <ClockBar section="ABOUT" />
 *     <Card variant="about" header="Ident"   >…</Card>
 *     <Card variant="about" header="Summary" >…</Card>
 *     …
 *   </Terminal>
 */
export default function Terminal({ className = "", children }) {
  return (
    <section className={`terminal ${className}`}>
      <div className="terminal-scroll">
        {children}
      </div>
    </section>
  );
}

