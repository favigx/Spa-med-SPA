import { useState, useEffect } from 'react'
import './App.css'
import Home from './components/pages/home/Home';
import About from './components/pages/about/About';
import Booking from './components/pages/booking/Booking';
import Meny from './components/meny/Meny';
import Packages from './components/pages/packages/Packages';

function App() {

  const [page, setPage] = useState<string>("");

  useEffect(() =>{

    let pageUrl = page

    if(!pageUrl){

      const queryParameters = new URLSearchParams(window.location.search)
      const getUrl = queryParameters.get("page");
  
      if(getUrl){
        pageUrl = getUrl;
        setPage(getUrl)
      } else{
        pageUrl = "home"
      }
    }

    window.history.pushState(
      null,
      "",
      "?page=" + pageUrl
    )
  }, [page])


  return (
    <>
     <Meny setPage={setPage} />

     {
      {
        "home": <Home />,
        "packages": <Packages />,
        "booking": <Booking />,
        "about": <About />
      } [page]
     }
    </>
  )
}

export default App