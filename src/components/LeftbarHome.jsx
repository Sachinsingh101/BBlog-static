import { Box, Typography, Paper, Divider, Button } from "@mui/material";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import HouseSidingIcon from "@mui/icons-material/HouseSiding";
import SaveAsOutlinedIcon from "@mui/icons-material/SaveAsOutlined";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { useNavigate, Link } from "react-router-dom";
import { motion } from 'framer-motion'
import  { useSelector } from 'react-redux'
function LeftHomeBar() {
  const singleUser = useSelector((state) => state.users.user);
  const navigate=useNavigate();
  return (
    <>
      <Box>
        <Paper
          elevation={1}
          className='Quickbar'
          sx={{ position: "sticky", top: "0px" }}>
          <Box component={motion.div} whileHover={{scale:1.2}} onClick={()=>navigate('/')}>
            <HouseSidingIcon />
            <Typography variant='h6' >
              Home
            </Typography>
          </Box>
          <Box component={motion.div} whileHover={{scale:1.2}} onClick={()=>navigate('/Search')}>
            <ExploreOutlinedIcon />
              <Typography variant='h6'>Explore</Typography>
          </Box>
          <Box component={motion.div} whileHover={{scale:1.2}} onClick={()=>navigate(`/account-settings/${singleUser ? singleUser.username : null }`)}>
            <DashboardOutlinedIcon />
            <Typography variant='h6'>
              Dashboard
            </Typography>
          </Box>
          <Box component={motion.div} whileHover={{scale:1.2}} onClick={()=>navigate('/create-blog')}>
            <SaveAsOutlinedIcon />
            <Typography variant='h6'>
              Write
            </Typography>
          </Box>
          <Box component={motion.div} whileHover={{scale:1.2}} onClick={()=>navigate('/Events')}>
            <EmojiEventsOutlinedIcon />
            <Typography variant='h6' >
              Events
            </Typography>
          </Box>
          <Divider />
          <Box>
            <Typography variant='subtitle1'>Trending Topics</Typography>
          </Box>
          <Box>
            <Typography m={1} variant='subtitle1'>
              Javascript
            </Typography>
          </Box>
          <Box>
            <Typography m={1} variant='subtitle1'>
              React Js
            </Typography>
          </Box>
          <Box>
            <Typography m={1} variant='subtitle1'>
              Web Development
            </Typography>
          </Box>
          <Box>
            <Typography m={1} variant='subtitle1'>
              Artificial Intelligence
            </Typography>
          </Box>
          <Box>
            <Typography m={1} variant='subtitle1'>
              Android Development
            </Typography>
          </Box>
          <Box>
            <Typography m={1} variant='subtitle1'>
              Machine Learning
            </Typography>
          </Box>
          <Box>
            <Typography m={1} variant='subtitle1'>
              Explore more
            </Typography>
            <OpenInNewIcon />
          </Box>
          <Box>
          <Link to='/Signup'>  
            {
              singleUser ? null :
              <Button
              sx={{ textAlign: "center", margin: "5px" }}
              variant='contained'>
              Signup
            </Button>
            }
          </Link>  
          </Box>
        </Paper>
      </Box>
    </>
  );
}
export default LeftHomeBar;
