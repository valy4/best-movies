import { color } from "@material-ui/system";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Image from "../assets/images/sorry-image-not-available.png"

function MoviePage() {
  let { imdbID } = useParams();
  const [details, setDetails] = useState([]);

  useEffect(() => {
    fetch(`https://www.omdbapi.com/?i=${imdbID}&apikey=20b3b01a`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setDetails((details) => [...details, data]);
      });
  }, [imdbID]);

  return (
    <div>
      <div>
        {details.map((detail) => (
          <ContainerPage>
            {detail.Poster !== "N/A" && (

              <Poster src={detail.Poster}></Poster>

            )
            }
            {
              detail.Poster === "N/A" && (
                <Poster
                  src={Image}
                  alt={detail.Title}
                ></Poster>
              )
            }

            <Text>
              <Title>{detail.Title}</Title>
              {detail.imdbRating !== "N/A" && (
                <p>
                  Rating <b style={{ color: "#fca311" }}>{detail.imdbRating}</b>
                </p>)}
              {detail.imdbRating === "N/A" && (<p>
                Rating <b style={{ color: "#fca311" }}>Not Available</b>
              </p>)}
              <button className="btn1">Add to favorite</button>
              {detail.Plot !== "N/A" && (<Plot>{detail.Plot}</Plot>)
              }
              {detail.Plot === "N/A" && <Plot>Sorry no description available!</Plot>}
            </Text>
          </ContainerPage>
        ))}
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
