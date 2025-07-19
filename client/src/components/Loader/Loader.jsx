import './loader.css';

export default function Loader() {
  return (
    <div className="loader-container">
        <p className="loader-text">LOADING MODULE</p>
      <div className="loading-bar">
        <div className="moving-bar"></div>
      </div>
    </div>
  );
}
