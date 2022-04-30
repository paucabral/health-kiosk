import './App.css';
import Navigation from './components/Navigation';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Triage from './screens/Triage';
import Facilities from './screens/Facilities';
import Results from './screens/Results';
import Disclaimer from './screens/Disclaimer';
import About from './screens/About';
import Language from './screens/Language';

function App() {
  return (
    <div className="App" style={{ height: "100vh", width: "100vw" }}>
      <Navigation />
      <div className='d-flex align-items-center justify-content-center' style={{ height: "100%" }}>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Language />} />
            <Route exact path="/disclaimer" element={<Disclaimer />} />
            <Route path="/check" element={<Triage />} />
            <Route path="/results" element={<Results />} />
            <Route path="/nearest-facilities" element={<Facilities />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
