import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Layout from '@/components/Layout/Layout';
import Home from '@/pages/Home/Home.jsx';
import About from '@/pages/About/About.jsx';
import Projects from '@/pages/Projects/Projects.jsx';
import Services from '@/pages/Services/Services.jsx';
import Contact from '@/pages/Contact/Contact.jsx';
import NotFound from '@/pages/NotFound/NotFound.jsx';

function App() {

  return (
    <BrowserRouter>
      <Routes element={<Layout />}>
        <Route path="/" element={<Home dim="false" star="true"/>} />
        <Route path="/about" element={<About dim="true"  star="true"/>} />
        <Route path="/projects" element={<Projects dim="true"  star="true"/>} />
        <Route path="/services" element={<Services dim="true"  star="true"/>} />
        <Route path="/contact" element={<Contact dim="true"  star="true"/>} />
        <Route path="*" element={<NotFound dim="false" star="false"/>} />
      </Routes>
      </BrowserRouter>
  )
}

export default App
