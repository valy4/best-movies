import React, { useState, useEffect } from "react";
import { Box, TextField, Button } from "@material-ui/core";
import Image from "../assets/images/sorry-image-not-available.png";
import styled from "styled-components";
import { Link } from "react-router-dom";

function FavoritePage() {
  const [movieList, setMovieList] = useState([]);

  async function fetchAllMovies() {
    const movieIdList = localStorage.getItem("favoritesMovies")
      ? localStorage.getItem("favoritesMovies").split(",")
      : [];
    console.log(movieIdList, "movieIdList");
    const movieDataList = await Promise.all(
      movieIdList.map((id) => {
        return fetch(`https://www.omdbapi.com/?i=${id}&apikey=20b3b01a`)
          .then((response) => response.json())
          .then((data) => {
            console.log(data, "data");

            return data;
          });
      })
    );
    setMovieList(movieDataList);
  }

  useEffect(() => {
    fetchAllMovies();
  }, []);

  return (
    <FavPage>
      {movieList?.map(function (film) {
        return (
          <Box className="row" style={{ backgroundColor: "#e5e5e5", marginTop: "2rem" }}>
            {film.Poster !== "N/A" && (
              <img
                className="col left poster"
                src={film.Poster}
                alt={film.Title}
              ></img>
            )}
            {film.Poster === "N/A" && (
              <img
                className="col left poster"
                src={Image}
                alt={film.Title}
              ></img>
            )}
            <Box className="col right">
              <Title>{film.Title}</Title>
            </Box>

          </Box>
        );
      })}
      <Link to={`/`}>
        <button className="btn">Home</button>
      </Link>
    </FavPage >
  );
}

export default FavoritePage;
const FavPage = styled.div`
height: 100%;



`
const Title = styled.p`
color:#fca311;
text-decoration: none;

  `