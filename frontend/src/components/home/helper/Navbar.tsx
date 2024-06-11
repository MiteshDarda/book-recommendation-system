// src/components/Navbar.js
import { FC } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

interface NavbarProps {
  onLogout: () => void;
}

const Navbar: FC<NavbarProps> = ({ onLogout }) => {
  return (
    <AppBar
      position="fixed"
      color="default"
      sx={{
        top: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '90%',
        backgroundColor: 'white',
        boxShadow: 3,
        borderRadius: 1
      }}>
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1 }}
          className="nanum-gothic-regular ">
          Book Recommendation System
        </Typography>
        <Button variant="contained" color="inherit" onClick={onLogout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
