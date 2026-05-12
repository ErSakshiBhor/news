import './App.css'
import React, { useState } from 'react'
import NavBar from './components/NavBar';
import News from './components/News';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

const App = () => {
  const pageSize = 10;
  const [progress, setProgress] = useState(0);

  return (
    <div>
      <Router>
        <NavBar />
        <LoadingBar
          height={3}
          color="#f11946"
          progress={progress}
        />
        <Routes>
          <Route exact path="/" element={<News setProgress={setProgress} key="Home" pageSize={pageSize} country="us" category="general" />} />
          <Route exact path="/Science" element={<News setProgress={setProgress} key="Science" pageSize={pageSize} country="us" category="Science" />} />
          <Route exact path="/Business" element={<News setProgress={setProgress} key="Business" pageSize={pageSize} country="us" category="Business" />} />
          <Route exact path="/Entertainment" element={<News setProgress={setProgress} key="Entertainment" pageSize={pageSize} country="us" category="Entertainment" />} />
          <Route exact path="/General" element={<News setProgress={setProgress} key="General" pageSize={pageSize} country="us" category="General" />} />
          <Route exact path="/Health" element={<News setProgress={setProgress} key="Health" pageSize={pageSize} country="us" category="Health" />} />
          <Route exact path="/Sports" element={<News setProgress={setProgress} key="Sports" pageSize={pageSize} country="us" category="Sports" />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
