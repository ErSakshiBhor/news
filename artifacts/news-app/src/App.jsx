import './App.css'
import React, { useState } from 'react'
import NavBar from './components/NavBar';
import News from './components/News';
import SearchResults from './components/SearchResults';
import Bookmarks from './components/Bookmarks';
import Ticker from './components/Ticker';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
import { useCountry } from './hooks/useCountry';

const App = () => {
  const pageSize = 10;
  const [progress, setProgress] = useState(0);
  const { country, setCountry, currentCountry } = useCountry();

  return (
    <div>
      <Router>
        <NavBar country={country} setCountry={setCountry} currentCountry={currentCountry} />
        <Ticker country={country} />
        <LoadingBar height={3} color="#f11946" progress={progress} />
        <Routes>
          <Route path="/"            element={<News setProgress={setProgress} key={`Home-${country}`}          pageSize={pageSize} country={country} category="general"       />} />
          <Route path="/Science"     element={<News setProgress={setProgress} key={`Science-${country}`}       pageSize={pageSize} country={country} category="science"       />} />
          <Route path="/Business"    element={<News setProgress={setProgress} key={`Business-${country}`}      pageSize={pageSize} country={country} category="business"      />} />
          <Route path="/Entertainment" element={<News setProgress={setProgress} key={`Entertainment-${country}`} pageSize={pageSize} country={country} category="entertainment" />} />
          <Route path="/General"     element={<News setProgress={setProgress} key={`General-${country}`}       pageSize={pageSize} country={country} category="general"       />} />
          <Route path="/Health"      element={<News setProgress={setProgress} key={`Health-${country}`}        pageSize={pageSize} country={country} category="health"        />} />
          <Route path="/Sports"      element={<News setProgress={setProgress} key={`Sports-${country}`}        pageSize={pageSize} country={country} category="sports"        />} />
          <Route path="/search"      element={<SearchResults setProgress={setProgress} />} />
          <Route path="/bookmarks"   element={<Bookmarks />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
