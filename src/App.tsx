import { useState, useEffect } from 'react'
import './App.css'
import Home from './components/pages/Home';
import About from './components/pages/About';
import Book from './components/pages/Book';
import Meny from './components/meny/Meny';

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
        pageUrl = "start"
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
     <h1>Spa</h1>

     <Meny setPage={setPage} />

     {
      {
        "home": <Home />,
        "book": <Book />,
        "about": <About />
      } [page]
     }
    </>
  )
}

export default App
