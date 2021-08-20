import React from "react"
import Box from '@material-ui/core/Box';
import { Link } from "react-router-dom";
import styled from "styled-components";



function Header() {
  return (
    <div style={{ backgroundColor: "black" }} >
      <Box className="title">
        <Box >Movie Catalog</Box>
        <FavMovies>
          <Link style={{ textDecoration: "none", color: "blue" }} to={`/favorites`}>Favorites Movies</Link>
        </FavMovies>
      </Box>
    </div>
  )
}


export default Header
const FavMovies = styled.div`
font-size: 1.5rem;
align-self:center;
& :hover {
  background-color: #fca311;

}
@media only screen and (max-width: 480px) {
  font-size: 1rem;
}

`