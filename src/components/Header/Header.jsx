import React from 'react';
import logo from "../../images/logo-removebg-preview.png";
import { Box} from "@mui/material";
import './header.css';

const Header = () => {
  return (
    <div>
        <Box className="navbar" >
<img src={logo} alt="logo" data-testId="logo"/>
        </Box>
    </div>
  )
}

export default Header