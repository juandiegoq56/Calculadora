import React from 'react';
import Datos from './historial';
import App1 from './Calculadora';




import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {
  return (
  
      <Router>
        <Routes>
          
          <Route path="/calculadora" element={<App1 />} />
          <Route path="/datos" element={<Datos />} />
         
          {/* Other routes */}
        </Routes>
      </Router>
    
  );
}

export default App;
