import './App.css'
import React, { useState } from 'react'
import NavBar from './components/NavBar';
import CategoryBar from './components/CategoryBar';
import News from './components/News';
import SearchResults from './components/SearchResults';
import Bookmarks from './components/Bookmarks';
import Ticker from './components/Ticker';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

const COUNTRY = 'in';

const App = () => {
  const pageSize = 10;
  const [progress, setProgress] = useState(0);

  return (
    <div>
      <Router>
        <NavBar />
        <Ticker country={COUNTRY} />
        <CategoryBar />
        <LoadingBar height={3} color="#f11946" progress={progress} />
        <Routes>
          <Route path="/"              element={<News setProgress={setProgress} key="Home"          pageSize={pageSize} country={COUNTRY} category="general"       featured={true} />} />
          <Route path="/Science"       element={<News setProgress={setProgress} key="Science"       pageSize={pageSize} country={COUNTRY} category="science"       />} />
          <Route path="/Business"      element={<News setProgress={setProgress} key="Business"      pageSize={pageSize} country={COUNTRY} category="business"      />} />
          <Route path="/Entertainment" element={<News setProgress={setProgress} key="Entertainment" pageSize={pageSize} country={COUNTRY} category="entertainment" />} />
          <Route path="/General"       element={<News setProgress={setProgress} key="General"       pageSize={pageSize} country={COUNTRY} category="general"       />} />
          <Route path="/Health"        element={<News setProgress={setProgress} key="Health"        pageSize={pageSize} country={COUNTRY} category="health"        />} />
          <Route path="/Sports"        element={<News setProgress={setProgress} key="Sports"        pageSize={pageSize} country={COUNTRY} category="sports"        />} />
          <Route path="/search"        element={<SearchResults setProgress={setProgress} />} />
          <Route path="/bookmarks"     element={<Bookmarks />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
