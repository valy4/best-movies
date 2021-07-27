import React, { useState, useEffect } from "react";
import { Box, TextField, Button } from '@material-ui/core';
import Image from "../assets/images/sorry-image-not-available.png";


function FavoritePage() {
  const movies = localStorage.getItem("favoritesMovies") ? localStorage.getItem("favoritesMovies").split(",") : [];

  const [details, setDetails] = useState({});
  let favMovies = []

  useEffect(() => {
    for (let id of movies) {
      fetch(`https://www.omdbapi.com/?i=${id}&apikey=20b3b01a`)
        .then((response) => response.json())
        .then((data) => {
          favMovies.push(data);
          console.log(favMovies);
        });
    }
  }, []);

  return (
    <>
      {/* {
        favMovies.map((fav) => {
          <div>

            <h2>{fav.Title}</h2>
            <img src={fav.Poster} alt="poster" />

          </div>
        })
      } */}
      {favMovies?.map(function (film) {
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
              <p>{film.Title}</p>

            </Box>
          </Box>
        );
      })}
    </>
  )
}

export default FavoritePage