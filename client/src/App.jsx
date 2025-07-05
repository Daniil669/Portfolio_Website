import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from '@/pages/Home/Home.jsx';
import About from '@/pages/About/About.jsx';
import Projects from '@/pages/Projects/Projects.jsx';
import Services from '@/pages/Services/Services.jsx';
import Contact from '@/pages/Contact/Contact.jsx';
import NotFound from '@/pages/NotFound/NotFound.jsx';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      </BrowserRouter>
  )
}

export default App
