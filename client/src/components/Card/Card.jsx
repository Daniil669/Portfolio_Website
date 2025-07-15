import { useLocation } from 'react-router-dom';
import './card.css';
import Globe from '../../assets/Globe.svg'

export default function Card({ page }) {
  const location = useLocation();
  const currentPath = location.pathname;


  return (
    <article className={`card ${page}`}>
      {/* Icon or photo
      {data.icon && (
        <div className='icon-photo'>
          <img src={data.icon} alt="icon" />
        </div>
      )}
      {isAbout && data.photo && (
        <div className='icon-photo'>
          <img src={data.photo} alt="profile" />
        </div>
      )} */}

      {/* Text Section */}
      <div className="text-button">
        <div className="text">
          {data.title && <p className="title-card">{data.title}<span>{":"}</span></p>}
          <ul className='items-list'>
            {data.description && data.description.map((p, i) => (
            <li className="paragraph-card" key={i}>{p}</li>
          ))}
          </ul>
        </div>

        {/* Buttons Section */}
          <div className="button-group-card">
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="terminal-button-card"
              >
                {"[DEMO]"}
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="terminal-button-card"
              >
                {"[SOURCE CODE]"}
              </a>
          </div>
      </div>
    </article>
  );
}
