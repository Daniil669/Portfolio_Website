# Portfolio_Website  
A retro-themed personal portfolio website designed like a **futuristic terminal interface**. Built with a full-stack architecture using **React.js** and **Flask**, it showcases categorized GitHub projects and demonstrates dynamic content handling. Designed in Figma, styled with a mix of custom and third-party animations, and structured using modular development principles.

---

## Result  
**[Visit the website → daniilengineer.dev](https://daniilengineer.dev/)**

---

## Overview  

This portfolio project was built to reflect both personality and structure — retro aesthetics combined with clean architecture and responsive design. It features:

- A terminal-inspired UI built from scratch  
- GitHub project categorization: Personal, University, Freelance  
- Project explorer with links to source code (demos/results/previews only where applicable)    
- Responsive layouts for mobile, tablet, laptop, and 2K/4K  
- A secure contact form with CAPTCHA and backend validation  
- CV download handled via Flask API endpoint  

---

## Tech Stack

### Frontend
- React.js (Vite)
- React Router for page transitions
- CSS Modules + third-party animation libraries  
  _(Fade-in, Typing Effect, Space Fly-through)_

### Backend
- Flask (Python)
- JSON-based routing for About, Services, and Projects
- GitHub API integration to fetch and categorize repositories
- POST endpoint for contact form with reCAPTCHA verification
- Dynamic CV file serving

---

## Security Considerations

- Contact form includes **Google reCAPTCHA** to prevent spam  
- All user input is validated and sanitized server-side  
- Error handling and logging are included in backend routes  
- Content is served read-only from controlled JSON sources  

---

## Development Process

This website was fully custom-built with a clean dev workflow:

- **Figma** used to design all layouts across screen sizes  
- **Whiteboard planning** for page layout and component breakdown 
- Modular **component-based structure** in both frontend and backend  
- Used **Git** with daily commits 
- Built and tested locally, deployed to:  
  - Frontend: **Netlify**  
  - Backend: **Render**

> _Note: No Docker setup or CI/CD pipelines are included — this project focuses on clean code and direct deployment._

---

## Project Data Sources

Projects are fetched dynamically using the GitHub API and grouped as follows:

- **Personal** — Custom utilities and hobby projects  
- **University** — Academic coursework and assignments (source code only)  
- **Freelance** — Client project: a real web shop for a skate gear business  
- **Coming Soon** — Placeholder for future tools  

---

## Contact & CV

The **Contact** page lets users send messages via a secure backend.  
CV download is handled through an authenticated GET request from Flask.

---


