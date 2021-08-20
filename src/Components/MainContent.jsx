import React, { useState, useEffect } from "react";
import { Box, TextField, Button } from '@material-ui/core';
import Image from "../assets/images/sorry-image-not-available.png";
import { Pagination } from '@material-ui/lab';
import { Link } from "react-router-dom";
import styled from "styled-components";



function MainContent() {
  const [search, setSearch] = useState("pride and prejudice");
  const [listFilm, setListFilm] = useState([]);
  const [nrPages, setNrPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const handleChange = (event, value) => {
    setCurrentPage(value);
  }

  useEffect(() => {
    fetch(
      `https://www.omdbapi.com/?s=${search}&page=${currentPage}&apikey=20b3b01a`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setListFilm(data.Search);
        const temp = Math.ceil(data.totalResults / 10);
        setNrPages(temp);
      });
  }, [currentPage]);
  const pagesList = [];
  for (let i = 1; i <= nrPages; i++) {
    pagesList.push(i);
  }
  function getMovies(event) {
    fetch(
      `https://www.omdbapi.com/?s=${search}&page=${currentPage}&apikey=20b3b01a`
    )
      .then((response) => response.json())

      .then((data) => {

        setListFilm(data.Search);
        const temp = Math.ceil(data.totalResults / 10);
        setNrPages(temp);
        const pagesList = [];
        for (let i = 1; i <= nrPages; i++) {
          pagesList.push(i);
        }
      });
  }
  console.log(pagesList)

  return (
    <Box>
      <Box className="search-section">
        <TextField size="small" id="outlined-basic" label="Search Movie..." variant="outlined"
          onChange={(event) => setSearch(event.target.value)}
        />
        <Button size="medium" variant="contained" onClick={getMovies}>Search</Button>
      </Box>

      <Box className="box">
        {!listFilm && <p>Sorry no movie found!</p>}

        {listFilm?.map(function (film) {
          return (
            <Box className="row" style={{ backgroundColor: "#e5e5e5" }}>
              {film.Poster !== "N/A" && (

                <img className="col left poster"

                  src={film.Poster}
                  alt={film.Title}
                ></img>

              )
              }
              {
                film.Poster === "N/A" && (
                  <img
                    className="col left poster"
                    src={Image}
                    alt={film.Title}
                  ></img>
                )
              }
              < Box className="col right" >
                <Link style={{ textDecoration: "none" }} to={`/movie/${film.imdbID}`}><Title>{film.Title}</Title></Link>
                <p>{film.Year}</p>

              </Box>
            </Box>
          );
        })}
      </Box >
      <Box className="pages">

        <Pagination count={nrPages} page={currentPage} onChange={handleChange} variant="outlined" shape="rounded" />
      </Box>

    </Box >
  );
}

export default MainContent;
const Title = styled.p`
color:#fca311;
text-decoration: none;
&:hover{color:#FBC740};
 @media only screen and (max-width: 480px) {
font-size: 1rem;
text-align: justify;
width: 15rem;
}
@media only screen and (max-width: 768px) and (min-width: 481px) {

}
  `


