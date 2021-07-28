import React, { useState, useEffect } from "react";
import { Box, TextField, Button } from '@material-ui/core';
import Image from "../assets/images/sorry-image-not-available.png";


function FavoritePage() {

  const [movieList, setMovieList] = useState([]);

  async function fetchAllMovies(){
    const movieIdList = localStorage.getItem("favoritesMovies") ? localStorage.getItem("favoritesMovies").split(",") : [];
    console.log(movieIdList, "movieIdList")
    const movieDataList = await Promise.all(movieIdList.map(id => {
      return fetch(`https://www.omdbapi.com/?i=${id}&apikey=20b3b01a`)
      .then((response) => response.json())
      .then((data) => {
        // you change var
        // favMovies.push(data);
        console.log(data, "data")
        
        // console.log(favMovies, "fav movie");
        return data
      });
    }))
    setMovieList(movieDataList)
  }

  useEffect(() => {
    
    fetchAllMovies()
    
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
      {movieList?.map(function (film) {
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