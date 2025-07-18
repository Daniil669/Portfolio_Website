import Terminal from './../components/TerminalWrapper/Terminal.jsx';
import ClockBar from './../components/ClockBar/ClockBar.jsx';
import NavBar from './../components/NavBar/NavBar.jsx';
import { useEffect, useState } from 'react';
import { useAnimation } from '../context/AnimationContext.jsx';
import { about_api, about_photo_api, cv_api } from '../api/infoApi.js';
import download from "downloadjs";

export default function About() {
  const [loading, setLoading] = useState(false);
  const { showAnimation, resetAnimation } = useAnimation();
  const animationState = showAnimation[1];
  const [aboutData, setAboutData] = useState(null);
  const [photoLink, setPhotoLink] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const about_data = await about_api();
      const about_photo = await about_photo_api();
      setAboutData(about_data);
      setPhotoLink(about_photo);
    }
    fetchData();
  }, []);

  const handleDownloadCV = async () => {
    setLoading(true);
    try{
    const dataLink = await cv_api(); // blob
    let fileName = "Test.pdf";
    download(dataLink, fileName);
    } catch (error) {
      console.log("CV download failed: " + error);
    } finally {
      setLoading(false)
    }

  }

  useEffect(() => {
    if (showAnimation[1]) {
      resetAnimation();
    }
  }, []);

  return (
    <Terminal>
      <NavBar />
      <ClockBar section={"BIO-LOG (About)"} />
      {animationState && aboutData && (
        <div className="fade-in">
          <div className="wrapper">
            <section className='main-info'>
              <div className="image-wrapper">
                <img src={photoLink} alt="profile_photo" />
              </div>
              <div className="text-wrapper">
                <div className="text-info">
                    <p className='text-property'>IDENT:</p>
                    <p className='text-value my-name'>{aboutData.ident}</p>
                </div>
                <div className="text-info">
                    <p className='text-property'>ROLE:</p>
                <p className='text-value'>{aboutData.role}</p>
                </div>
                <div className="text-info">
                    <p className='text-property'>STATUS:</p>
                <p className='text-value'>{aboutData.status}</p>
                </div>
                <div className="text-info">
                    <p className='text-property'>LOCATION:</p>
                <p className='text-value'>{aboutData.location}</p>
                </div>
                <div className="languages">
                  <p className='text-property'>LINGUISTIC CAPABILITIES:</p>
                  <div className='languages-wrapper'>
                    {aboutData.linguistic_capabilities.map((item, index) => (
                      <div className='language-wrapper' key={index}>
                        <p className='text-value'>{item.language}</p>
                        <div className="progress-bars">
                          {[...Array(5)].map((_, idx) => (
                            <span key={idx} className={`block ${idx < item.level ? 'filled' : ''}`} />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <section className="prof-summary">
              <p className='text-property'>PROFESSIONAL SUMMARY:</p>
              <p className='text-value'>{aboutData.professional_summary}</p>
            </section>

            <section className="experience">
              <p className='text-property'>TECH EXPERIENCE:</p>
              <ul className='about-ul'>{aboutData.experience.tech.map((item, idx) => <li key={idx}>{item}</li>)}</ul>
              <p className='text-property'>NON-TECH EXPERIENCE:</p>
              <ul className='about-ul'>{aboutData.experience.non_tech.map((item, idx) => <li key={idx}>{item}</li>)}</ul>
            </section>

            <section className="tech-skills">
              <p className='text-property'>TECHNICAL SKILLS:</p>
              {Object.entries(aboutData.technical_skills).map(([category, skills], idx) => (
                <div key={idx}>
                  <p className='text-subcategory'>{category}:</p>
                  <ul className='about-ul'>{skills.map((s, i) => <li className="tech-skill" key={i}>{s}</li>)}</ul>
                </div>
              ))}
            </section>

            <section className="academy-records">
              <p className='text-property'>ACADEMY RECORDS:</p>
              <ul className='about-ul'>{aboutData.academy_records.map((rec, idx) => <li key={idx}>{rec}</li>)}</ul>
            </section>

            <section className="soft-skills">
              <p className='text-property'>CREW TRAITS:</p>
              <ul className='about-ul'>{aboutData.crew_traits.map((trait, idx) => <li key={idx}>{trait}</li>)}</ul>
            </section>

            <section className="hobbies">
              <p className='text-property'>HOBBIES:</p>
              <ul className='about-ul'>{aboutData.hobbies.map((hobby, idx) => <li key={idx}>{hobby}</li>)}</ul>
            </section>

            <section className="currently-learning">
              <p className='text-property'>CURRENTLY LEARNING:</p>
              <ul className='about-ul'>{aboutData.currently_learning.map((item, idx) => <li key={idx}>{item}</li>)}</ul>
            </section>
            <div className="download-cv">
              <p><span>{">>"}</span> Download my CV</p>
              <button onClick={()=>{handleDownloadCV()}} disabled={loading}>{loading ? "[DOWNLOADING...]" : "[DOWNLOAD]"}</button>
            </div>
          </div>
        </div>
      )}
    </Terminal>
  );
}
