import { useLocation } from 'react-router-dom';
import './card.css';
import Globe from '../../assets/Globe.svg'

export default function Card({data}) {
  const location = useLocation();
  const currentPath = location.pathname;


  return (
    <article className={`card`}>
      {/* { && (
        <div className='icon-photo'>
          
        </div>
      )} */}
      <div className="text-button">
        <div className="text">
          {data.title && <p className="title-card">{data.title}<span>{":"}</span></p>}
            {data.tags && data.tags.map(item=>{return <span>{item+" "}</span>})}
          <ul className='items-list'>
            {data.description && data.description.map((p, i) => (
            <li className="paragraph-card" key={i}>{p}</li>
          ))}
          </ul>
        </div>

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
