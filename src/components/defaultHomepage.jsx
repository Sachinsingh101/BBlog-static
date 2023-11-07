import internshipBanner from './images/internshipdrive.jpg'
import FavoriteIcon from "@mui/icons-material/Favorite";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Snackbar from "@mui/material/Snackbar";
import slugify from 'slugify'
import {
  Box,
  Typography,
  Avatar,
  Paper,
  Button,
  IconButton,
} from "@mui/material";
import CommentIcon from "@mui/icons-material/Comment";
import CloseIcon from '@mui/icons-material/Close';
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BlogLoader from "./BlogLoader.jsx";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
function DefaulthomePage() {
  const navigate = useNavigate();
  var Blogs = new Array();
  Blogs = useSelector((state) => state.blogs.blogs);
  const user = useSelector((state) => state.users.user);
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(true);
  };
  

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  return (
    <>
      <Paper elevation={3}>
        <a href="">
          <img src={internshipBanner} style={{height:'150px',width:'100%'}} />
        </a>
      </Paper>
      {Blogs.length !== 0 ? (
        <Box mb={8}>
          {Blogs.map((result, index) => {
            return (
              <Paper
                key={index}
                elevation={2}
                sx={{
                  padding: "2vh",
                  marginTop: "1vh",
                  "&:hover": { cursor: "pointer" },
                }}
                className='standardHoverEffct'>
                <LazyLoadImage
                  src={result.image}
                  width={"100%"}
                  height={"200px"}
                  alt='error loading images'
                  effect='black-and-white'
                />
                <Box ml={2} sx={{ display: "flex", alignItems: "center" }}>
                  <Avatar onClick={()=>navigate(`/View-Profile/${result.userId}/${result.author}`)} sx={{border:'2px solid white','&:hover':{scale:'1.2',transitionDuration:'0.2s',animationTimingFunction:'ease-in-out',borderColor:'blue'}}} src={`${result.picture}`} />
                  <Box mx={1}>
                    <Typography variant='subtitle1'>{result.author}</Typography>
                    <Typography variant='subtitle2'>{result.date}</Typography>
                  </Box>
                </Box>
                <Box
                  ml={5}
                  sx={{
                    "&:hover": {
                      color: "#373EBD",
                      cursor: "pointer",
                      fontFamily: "Alfa Slab One",
                    },
                  }}>
                  <Typography
                    variant='h6'
                    onClick={() => navigate(`/${slugify(result.heading)}/${result._id}`)}>
                    {result.heading}
                  </Typography>
                </Box>
                <Box ml={5} mt={0} sx={{ width: "100%" }}>
                  <span onClick={handleClick}>
                    <Button
                      component={motion.div}
                      whileTap={{ scale: 2 }}
                      variant='text'
                      onClick={async () => {
                        await axios.post("/likesRoute", {
                          userid: user._id,
                          blogId: result._id,
                        });
                      }}
                      startIcon={<FavoriteIcon />}>
                      {result.likes.length} Likes
                    </Button>
                  </span>
                  <Button
                    onClick={() => navigate(`/${result._id}`)}
                    ml={2}
                    variant='text'
                    startIcon={<CommentIcon />}>
                    {result.comments.length} Comments
                  </Button>
                  <Button
                    onClick={() => navigate(`/${result._id}`)}
                    ml={2}
                    variant='text'
                    startIcon={<BookmarkAddIcon />}></Button>
                </Box>
              </Paper>
            );
          })}
        </Box>
      ) : (
        <Box>
          <BlogLoader />
          <BlogLoader />
          <BlogLoader />
          <BlogLoader />
        </Box>
      )}
      <div>
        <Snackbar
          open={open}
          autoHideDuration={3000}
          onClose={handleClose}
          message='Updated on next refresh'
          
        />
      </div>
    </>
  );
}
export default DefaulthomePage;
