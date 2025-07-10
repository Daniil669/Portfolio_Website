import { useLocation } from 'react-router-dom';
import './card.css';
import Person from '../../assets/Person.svg'

export default function Card({ page }) {
  // optionally auto-detect page from route
  const location = useLocation();
  const currentPath = location.pathname;

  const data = {icon: Person, description: [
                "Frontend with React, JavaScript",
                "Backend using Flask, Django, Gin, Spring Boot, Fast API",
                "REST APIs and JSON-based endpoints",
                "Docker, CI/CD workflows, GitHub Actions, environment configuration"
            ],
            title: "Full-Stack Web Development"}

  const isAbout = page === 'about' || currentPath.includes('/about');
  const isProjects = page === 'projects' || currentPath.includes('/projects');
  const isServices = page === 'services' || currentPath.includes('/services');

  return (
    <article className={`card ${page}`}>
      {/* Icon or photo */}
      {data.icon && (
        <div className='icon-photo'>
          <img src={data.icon} alt="icon" />
        </div>
      )}
      {isAbout && data.photo && (
        <div className='icon-photo'>
          <img src={data.photo} alt="profile" />
        </div>
      )}

      {/* Text Section */}
      <div className="text-button">
        <div className="text">
          {data.title && <p className="title">{data.title}</p>}
          {data.subtitles && data.subtitles.map((sub, i) => (
            <p className="subtitle" key={i}>{sub}</p>
          ))}
          {data.description && data.description.map((p, i) => (
            <p className="paragraph" key={i}>{p}</p>
          ))}
        </div>

        {/* Buttons Section */}
        {data.buttons && (
          <div className="button-group">
            {data.buttons.map((btn, i) => (
              <a
                key={i}
                href={btn.href}
                target="_blank"
                rel="noopener noreferrer"
                className="terminal-button"
              >
                [{btn.label}]
              </a>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
