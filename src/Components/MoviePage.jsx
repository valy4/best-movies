import { color } from "@material-ui/system";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Image from "../assets/images/sorry-image-not-available.png";

function MoviePage() {
  let { imdbID } = useParams();
  const [favorites, setFavorites] = useState(
    localStorage.getItem("favorites") ? localStorage.getItem("favorites").split(",") : []
  );
  const [details, setDetails] = useState({});

  useEffect(() => {
    fetch(`https://www.omdbapi.com/?i=${imdbID}&apikey=20b3b01a`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setDetails(data);
      });
  }, [imdbID]);

  useEffect(() => {
    localStorage.setItem("favorites", favorites);
  }, [favorites]);

  console.log(favorites);
  return (
    <div>
      <div>
        <ContainerPage>
          {details.Poster !== "N/A" && <Poster src={details.Poster}></Poster>}
          {details.Poster === "N/A" && (
            <Poster src={Image} alt={details.Title}></Poster>
          )}

          <Text>
            <Title>{details.Title}</Title>
            {details.imdbRating !== "N/A" && (
              <p>
                Rating <b style={{ color: "#fca311" }}>{details.imdbRating}</b>
              </p>
            )}
            {details.imdbRating === "N/A" && (
              <p>
                Rating <b style={{ color: "#fca311" }}>Not Available</b>
              </p>
            )}
            {favorites.includes(details.Title) ? (
              <button
                disabled={!favorites.includes(details.Title)}
                className="btn1"
                onClick={() => {
                  // filter the ones that are not our favourite
                  const newFavList = favorites.filter(
                    (fav) => fav !== details.Title
                  );

                  // update state
                  setFavorites(newFavList);
                }}
              >
                Remove from favorites
              </button>
            ) : (
              <button
                disabled={favorites.includes(details.Title)}
                className="btn1"
                onClick={() => {
                  if (!favorites.includes(details.Title)) {
                    setFavorites([...favorites, details.Title]);
                  }
                }}
              >
                Add to favorite
              </button>
            )}

            {details.Plot !== "N/A" && <Plot>{details.Plot}</Plot>}
            {details.Plot === "N/A" && (
              <Plot>Sorry no description available!</Plot>
            )}
          </Text>
        </ContainerPage>
      </div>

      <Link to={`/`}>
        <button className="btn">Home</button>
      </Link>
    </div>
  );
}

export default MoviePage;
const ContainerPage = styled.div`
  display: flex;
  justify-content: center;
  margin: 5rem;
  color: #000814;
  height: 60vh;
`;
const Text = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 5rem;
  width: 40rem;
`;
const Title = styled.p`
  font-size: 2rem;
  color: #fca311;
`;
const Plot = styled.p`
  align-content: flex-end;
`;
const Poster = styled.img`
  width: 23%;
  height: 350px;
  object-fit: fill;
  margin-top: 2rem;
`;
