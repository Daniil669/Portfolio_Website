import './card.css';

export default function Card({ data, icon = null, variant="default" }) {
  const isGithubStyle = variant === "github";
  return (
    <article className="card">
      {icon && (
        <div className="icon-photo">
          <img src={icon} alt="icon" />
        </div>
      )}
      <div className="text-button">
        <div className="text">
          {isGithubStyle && <p className='title-card'>Name:</p>}
          {data.title && <p className={isGithubStyle ? "title-github" : "title-card"}>{data.title}<span>:</span></p>}
          {isGithubStyle && <p className='title-card'>Languages:</p>}
          {data.tags && (
            <div className={isGithubStyle ? "title-github" : "tags"}>
              {data.tags.map((tag, i) => <span key={i}>{tag} </span>)}
            </div>
          )}
          {isGithubStyle && <p className='title-card'>Description:</p>}
          {data.description && (
            <ul className="items-list" style={isGithubStyle ? {listStyle: "none", padding: "5px 0px"} : {}}>
              {Array.isArray(data.description)
                ? data.description.map((p, i) => <li key={i} className="paragraph-card">{p}</li>)
                : <li className="paragraph-card">{data.description}</li>
              }
            </ul>
          )}
        </div>

        {(data.links?.demo || data.links?.source) && (
          <div className="button-group-card">
            {data.links.demo && (
              <a href={data.links.demo} target="_blank" rel="noopener noreferrer" className="terminal-button-card">
                {"[DEMO]"}
              </a>
            )}
            {data.links.source && (
              <a href={data.links.source} target="_blank" rel="noopener noreferrer" className="terminal-button-card">
                {"[SOURCE CODE]"}
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
}