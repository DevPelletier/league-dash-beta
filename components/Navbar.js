import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Box } from '@mui/material';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import Avatar from '@mui/material/Avatar';
import Link from 'next/link'

const mainLinks = [
  {
    text: "Standings",
    url: "/",
  },
  {
    text: "All Highlights",
    url: "/highlights",
  },
]

export default function Navbar() {
  const [teams, setTeams] = useState([]);

  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    fetch('/teams.json')
        .then((res) => res.json())
        .then((data) => {
            // console.log(data);
            setTeams(data);
    })

    }, []); 


  // Toggle the drawer open state
  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return; // Ignore keyboard tab/shift key events
    }
    setDrawerOpen(open);
  };

  // Drawer content
  const drawerList = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
      className="sideNav"
    >
      <List>
        {mainLinks.map((link) => (
          <ListItem key={link.id} disablePadding>
            <Link href={link.url} className="teamLink">
            <ListItemButton>
                <ListItemText primary={link.text} />
            </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {teams.map((item, index) => (
          <ListItem key={index} disablePadding>
            <Link href={"/teams/" + item.id} className="teamLink">
            <ListItemButton>
              <ListItemIcon>
                <Avatar alt="" src={item.logo}
                  // sx={{ width: 60, height: 60 }}
                  variant="circle"
                />
              </ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="static" className="nav">
        <Toolbar>
          {/* Menu Icon Button to Open Drawer */}
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>

          {/* App Title */}
          <Link href="/">
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            McDave League Dash (Beta)
          </Typography>
          </Link>


          {/* Optional Buttons */}
          {/* <Button color="inherit">Home</Button>
          <Button color="inherit">About</Button>
          <Button color="inherit">Contact</Button> */}
        </Toolbar>
      </AppBar>

      {/* Drawer Component */}
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        {drawerList}
      </Drawer>
    </>
  );
}
