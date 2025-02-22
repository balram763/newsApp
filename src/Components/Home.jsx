import React, { useContext, useEffect } from 'react'
import Slider from './Slider';
import WeatherCard from './WeatherCard';
import NewsSection from './NewsSection';
import ModeBtn from './ModeBtn';
import ThemeContext from '../Providers/Theme/ThemeContext';
import { fetchNews } from '../Providers/News/Action';
import NewsContext from '../Providers/News/NewsContext';

const Home = () => {
  const {mode} = useContext(ThemeContext)
  const {dispatch,allNews} = useContext(NewsContext)


  const getNews = async(topic) => {
    const data = await fetchNews(topic)

    dispatch({
      type : 'Get_News',
      payload : data
    })
  }

  useEffect(()=>{
    getNews("indore")
  },[])

  if(allNews.length === 0){
    return(
      <>
     <div className="text-center d-flex align-item-center justify-content-center container p-5"> 
     <button className="btn btn-dark " type="button" disabled>
      <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
      <span role="status"> Loading.....</span>
     </button>
     </div>
      </>
    )
  }
  return (
    <>
    <div className={mode ? "container-fluid bg-secondary text-light" : "container-fluid"}>

    <Slider/>
    <ModeBtn/>
    <div className="container flex-nowrap p-3">
      <div className='d-flex justify-content-between my-4'>
      <WeatherCard/>
      {/* <WeatherCard/>
      <WeatherCard/>  */}
      </div>

      <NewsSection/>
    </div>
    </div>
    </>
  )
}

export default Home