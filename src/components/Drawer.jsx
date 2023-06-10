import { List, ListItemIcon, Divider } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import HouseSidingIcon from "@mui/icons-material/HouseSiding";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useState } from "react";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import SaveAsOutlinedIcon from "@mui/icons-material/SaveAsOutlined";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import {
  Box,
  Typography,
  Avatar,
  IconButton,
  Drawer,
  ListItemButton,
  ListItemText,
  Button,
} from "@mui/material";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import back from './images/back.jpg'
import { motion } from 'framer-motion'
function Drawers() {
  const user=useSelector((state)=>state.users.user)
  const navigate=useNavigate();
  const [open, setopen] = useState(false);
  const drawerHandler = () => {
    setopen(true);
  };
  const Logout=async()=>{
      await axios.get('http://localhost:5000/api/logout',{withCredentials:true});
  }
  return (
    <>
      <Box>
        <IconButton onClick={drawerHandler} sx={{ display: { md: "none" } }}>
          <MenuIcon sx={{ "&:hover": { cursor: "pointer" } }} />
        </IconButton>
        <Drawer open={open} onClose={() => setopen(false)}>
          <List onClick={() => setopen(false)}>
            <img style={{width:'100%',height:'20vh',marginTop:'-20px'}} src={back} />
            <Box mb={3} mx={5}>
              <Typography variant='h6'>BBlog Community Plus</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <ListItemIcon>
                <Avatar src={`${user ? user.picture : null}`} alt={`${user ? user.username : null}`} sx={{ marginLeft: "5px" }} />
              </ListItemIcon>
              <ListItemText primary={`${user ? user.username : "Your Name here"}`} />
              <ListItemIcon>
                <IconButton onClick={Logout}>
                  <LogoutIcon />
                </IconButton>
              </ListItemIcon>
            </Box>
            <Box onClick={()=>navigate('/')}>
              <ListItemButton >
                <ListItemIcon>
                  <HouseSidingIcon />
                </ListItemIcon>
                <ListItemText primary='Home' />
              </ListItemButton>
            </Box>
            <Box onClick={()=>navigate('/Search')}>
              <ListItemButton>
                <ListItemIcon>
                  <ExploreOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary='Explore' />
              </ListItemButton>
            </Box>
            <Box onClick={()=>navigate(`/account-settings/${user ? user.username : null}`)}>
              <ListItemButton>
                <ListItemIcon>
                  <BookmarkBorderOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary='Reading List' />
              </ListItemButton>
            </Box>
            <Box onClick={()=>navigate('/create-blog')}>
              <ListItemButton>
                <ListItemIcon>
                  <SaveAsOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary='Write' />
              </ListItemButton>
            </Box>
            <Box>
              <ListItemButton>
                <ListItemIcon>
                  <EmojiEventsOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary='Events' />
              </ListItemButton>
            </Box>
            <Box mx={1} mt={2}>
              <Divider/>
            </Box>
            <Box>
              <Box mt={3} sx={{textAlign:'center'}}>
                <Typography variant='h6'>Made in<FavoriteIcon sx={{color:'red',width:'30px',height:'30px'}} />with Vanilla </Typography>
              </Box>
            </Box>
          </List>
        </Drawer>
      </Box>
    </>
  );
}

export default Drawers;
