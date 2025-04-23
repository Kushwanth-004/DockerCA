import React, { useEffect } from 'react'
import Pages from './components/mainpages/Pages'
import { Header } from './components/header/Header'
import { BrowserRouter as Router } from 'react-router-dom'
import './index.css';
import './input.css';
import { ProductApi } from './api/ProductApi'
import { DataProvider } from './GlobalState'
import { ActivityTypes, trackActivity } from './components/mainpages/utils/tracker';


const App = () => {
  useEffect(() => {
    // Track page view only once when the app loads
    trackActivity(ActivityTypes.PAGE_VIEW);

    // Track time spent on the page
    const startTime = Date.now();
    return () => {
      const duration = Date.now() - startTime;
      console.log(`Time spent on page: ${duration}ms`);
    };
  }, []); // Empty dependency array ensures this runs only once
  return (
    <DataProvider>
    <Router>
      <div className='App'>
        <Header/>
        <Pages/>
      </div>
    </Router>
    </DataProvider>
  )
}

export default App