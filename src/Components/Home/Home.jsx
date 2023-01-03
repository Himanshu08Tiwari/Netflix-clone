import React, { useEffect } from 'react'
import "./Home.scss"
import axios from "axios"
import { useState } from 'react'
import { Link } from "react-router-dom"
import {BiPlay} from "react-icons/bi" 
import {BiPlusCircle} from "react-icons/bi"

const apikey = "382a57487f22e94457b6ba0be64592c5"
const url = "https://api.themoviedb.org/3"
const imgurl = "https://image.tmdb.org/t/p/original"
const upcoming = "upcoming"
const nowPlaying = "now_playing"
const popular = "popular"
const topRated = "top_rated"

const Card = ({ img }) => (

  <img className='Card' src={img} alt='cover' />
)
const Row = ({ title, arr = [

] }) => (

  <div className='Row'>
    <h2>{title}</h2>

    <div>
      {
        arr.map((item, index) => (
          <Card key={index} img={`${imgurl}/${item.poster_path}`} />
        ))
      }
    </div>
  </div>
)
const Home = () => {

  const [upcomingMovies, setUpcomingMovies] = useState([])
  const [nowPlayingMovies, setnowPlayingMovies] = useState([])
  const [popularMovies, setpopuplarMovies] = useState([])
  const [topRatedMovies, settopRatedMovies] = useState([])
  const [genre, setGenre] = useState([])




  useEffect(() => {

    const fetchUpcoming = async () => {
      const { data: { results } } = await axios.get(`${url}/movie/${upcoming}?api_key=${apikey}`)
      setUpcomingMovies(results)
    };

    const fetchnowPlaying = async () => {
      const { data: { results } } = await axios.get(`${url}/movie/${nowPlaying}?api_key=${apikey}`)
      setnowPlayingMovies(results)
    };

    const fetchpopular = async () => {
      const { data: { results } } = await axios.get(`${url}/movie/${popular}?api_key=${apikey}`)
      setpopuplarMovies(results)
    };

    const fetchtopRated = async () => {
      const { data: { results } } = await axios.get(`${url}/movie/${topRated}?api_key=${apikey}`)
      settopRatedMovies(results)
    };

    const getAllGenre = async () => {

      const { data: { genres } } = await axios.get(`${url}/genre/movie/list?api_key=${apikey}`)
      setGenre(genres)
    };
    getAllGenre()
    fetchUpcoming()
    fetchnowPlaying()
    fetchpopular()
    fetchtopRated()

  }, [])

  return (
    <section className='home'>
      <div className="banner" style={{
        backgroundImage: popularMovies[0] ? `url(${`${imgurl}/${popularMovies[0].poster_path}`})` : "rgb(0, 0, 0)"
      }}>
        {popularMovies[0] && <h1>{popularMovies[0].original_title}</h1>}
        {popularMovies[0] && <p>{popularMovies[0].overview}</p>}


        <div>
          <button> <BiPlay/> Play </button>
          <button> <BiPlusCircle/> My list </button>
          
        </div>
      </div>

      <Row title={"upcoming Movies"} arr={upcomingMovies} />
      <Row title={"Now Playing"} arr={nowPlayingMovies} />
      <Row title={"Popular Movies"} arr={popularMovies} />
      <Row title={"Top Rated Movies"} arr={topRatedMovies} />

      <div className="genreBox">
        {
          genre.map((item) => (
            <Link key={item.id} to={`/genre/${item.id}`}>{item.name}</Link>
          ))
        }
      </div>


    </section>
  )
}

export default Home
