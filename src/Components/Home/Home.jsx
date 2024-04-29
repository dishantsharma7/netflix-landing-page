import React, { useEffect, useState } from "react";
import "./Home.scss";
import axios from "axios";
import { Link } from "react-router-dom";
import { BiPlus, BiPlay } from "react-icons/bi";

const apiKey = "93c0d0200ceb0d493130841fc670a3a5";
const url = "https://api.themoviedb.org/3";
const popular = "popular";
const upcoming = "upcoming";
const topRated = "top_rated";
const nowPlaying = "now_playing";
const imgUrl = "https://image.tmdb.org/t/p/original";

const Card = ({ img }) => <img className="card" src={img} alt="cover" />;

const Row = ({ title, arr = [] }) => (
  <div className="row">
    <h2>{title}</h2>
    <div>
      {arr.map((item, index) => (
        <Card key={index} img={`${imgUrl}/${item.poster_path}`} />
      ))}
    </div>
  </div>
);

const Home = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [genre, setGenre] = useState([]);

  useEffect(() => {
    const fetchPopular = async () => {
      const {
        data: { results },
      } = await axios.get(`${url}/movie/${popular}?api_key=${apiKey}`);

      setPopularMovies(results);
    };

    const fetchUpcoming = async () => {
      const {
        data: { results },
      } = await axios.get(`${url}/movie/${upcoming}?api_key=${apiKey}`);

      setUpcomingMovies(results);
    };
    const fetchNowPlaying = async () => {
      const {
        data: { results },
      } = await axios.get(`${url}/movie/${nowPlaying}?api_key=${apiKey}`);

      setNowPlayingMovies(results);
    };

    const fetchTopRated = async () => {
      const {
        data: { results },
      } = await axios.get(`${url}/movie/${topRated}?api_key=${apiKey}`);

      setTopRatedMovies(results);
    };
    const getAllGenre = async () => {
      //https://api.themoviedb.org/3/genre/movie/list
      const {
        data: { genres },
      } = await axios.get(`${url}/genre/movie/list?api_key=${apiKey}`);
      setGenre(genres);
    };

    fetchPopular();
    fetchNowPlaying();
    fetchTopRated();
    fetchUpcoming();
    getAllGenre();
  }, []);

  return (
    <section className="Home">
      <div
        className="banner"
        style={{
          backgroundImage: popularMovies[4]
            ? `url(${`${imgUrl}/${popularMovies[4].poster_path}`})`
            : "none",
        }}
      >
        {popularMovies[1] && <h1>{popularMovies[4].original_title}</h1>}
        {popularMovies[1] && <p>{popularMovies[4].overview}</p>}

        <div>
          <button>
            <BiPlay /> Play
          </button>

          <button>
            Add to List <BiPlus />
          </button>
        </div>
      </div>
      <Row title={"Popular on Netflix"} arr={popularMovies} />
      <Row title={"Upcoming Movies"} arr={upcomingMovies} />
      <Row title={"Top Rated"} arr={topRatedMovies} />
      <Row title={"Now Playing"} arr={nowPlayingMovies} />
      <div className="genreBox">
        {genre.map((item) => (
          <Link key={item.id} to={`/genre/${item.id}`}>
            {item.name}
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Home;
