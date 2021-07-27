import React from "react"
import Box from '@material-ui/core/Box';
import { Link } from "react-router-dom";



function Header() {
  return (
    <div>
      <Box className="title">Movie Catalog</Box>
      <Link style={{ textDecoration: "none" }} to={`/favorites`}>Favorites Movies</Link>
    </div>
  )
}


export default Header