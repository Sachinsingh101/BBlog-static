import { useParams, useNavigate } from "react-router-dom";
import {
  Avatar,
  Paper,
  Typography,
  Grid,
  Button,
  Skeleton,
  TextField,
  Box,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Snackbar from "@mui/material/Snackbar";
import CommentIcon from "@mui/icons-material/Comment";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import DOMPurify from "dompurify";
import axios from "axios";
import { useMemo, useRef } from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import LoyaltyIcon from "@mui/icons-material/Loyalty";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
function SpecifigBlog() {
  const navigate=useNavigate();
  const user = useSelector((state) => state.users.user);
  var moreblogs = new Array();
  moreblogs = useSelector((state) => state.blogs.blogs);
  const [blog, setblog] = useState("");
  const [comment, setComment] = useState("");
  const { id } = useParams();
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
  useMemo(async () => {
    try {
      await axios
        .get(`https://bblog-blogging-site.onrender.com/getsingleblog/${id}`)
        .then((res) => {
          setblog(res.data);
        });
    } catch (err) {
      console.log("error fetching single blog");
    }
  }, []);

  const commentHandler = (e) => {
    setComment(e.target.value);
  };
  const postComment = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post("https://bblog-blogging-site.onrender.com/post-comment", {
          id: blog._id,
          comment: comment,
          picture: user.picture,
        })
        .then((res) => {});
    } catch (err) {
      console.log("erro while posting comment", err);
    }
  };

  const RenderHTML = (props) => (
    <span
      dangerouslySetInnerHTML={{
        __html: DOMPurify.sanitize(props.HTML),
      }}></span>
  );

  const colorRef = useRef();
  const addToBookmarks = async () => {
    const url = window.location.href;
    colorRef.current.style.color = "black";
    try {
      await axios.post("https://bblog-blogging-site.onrender.com/add-to-bookmarks", {
        heading: blog.heading,
        url,
        user: user._id,
      });
    } catch (err) {
      console.log("Error while adding to bookmarks");
    }
  };

  return (
    <>
      <Grid
        mt={3}
        container
        sx={{ justifyContent: { md: "flex-end", xs: "center" } }}>
        <Grid item md={8} xs={12}>
          <Paper elevation={1}>
            {blog.image ? (
              <img
                src={blog.image}
                alt='cover image'
                style={{ width: "100%", height: "350px" }}
              />
            ) : (
              <Skeleton height={350} />
            )}
            <Box ml={1} mb={1} sx={{ padding: { sm: "10px", md: "30px" } }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Avatar src={`${blog ? blog.picture : null}`} />
                <Box ml={2}>
                  <Typography varaint='subtitle2'>
                    {blog ? blog.author : null}
                  </Typography>
                  <Typography varaint='subtitle1'>
                    {blog ? blog.date : null}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ fontSize: "20px" }}>
                <span onClick={handleClick}>
                  <Button
                    startIcon={<FavoriteIcon />}
                    variant='text'
                    onClick={async () => {
                      await axios.post("https://bblog-blogging-site.onrender.com/likesRoute", {
                        userid: user._id,
                        blogId:blog._id,
                      });
                    }}>
                    {blog ? blog.likes.length : null} likes
                  </Button>
                </span>
                <Button startIcon={<CommentIcon />} variant='text'>
                  {blog ? blog.comments.length : null} comment
                </Button>
                <Button
                  onClick={addToBookmarks}
                  startIcon={<BookmarkBorderIcon ref={colorRef} />}
                  variant='text'></Button>
              </Box>
              <Box mb={2} mt={2}>
                <Typography sx={{ fontFamily: "Alfa Slab One" }} variant='h3'>
                  {blog ? blog.heading : null}
                </Typography>
              </Box>
              <Box mb={3} sx={{ fontSize: "24px", paddingBottom: "20px" }}>
                <RenderHTML HTML={blog ? blog.content : null} />
              </Box>
            </Box>
          </Paper>
          <div>
            <Snackbar
              open={open}
              autoHideDuration={3000}
              onClose={handleClose}
              message='Updated on next refresh'
            />
          </div>
        </Grid>
        <Grid item md={3} sx={{ display: { xs: "none", md: "block" } }}>
          {user !== null && blog.author === user.username ? null : (
            <Box mr={2} ml={2}>
              <Paper elevation={1} sx={{ borderRadius: "10px" }}>
                <Box
                  sx={{
                    width: "100%",
                    height: "50px",
                    backgroundColor: "#3498DB",
                    borderTopRightRadius: "10px",
                    borderTopLeftRadius: "10px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}>
                  <Avatar
                    sx={{ width: 86, height: 86 }}
                    src={`${blog ? blog.picture : null}`}
                    alt={`${blog ? blog.author : null}`}
                  />
                  <Typography variant='h6'>
                    {blog ? blog.author : null}
                  </Typography>
                </Box>
                <Box mt={9} sx={{ textAlign: "center" }}>
                  <Button
                    sx={{ width: "80%", marginBottom: "30px" }}
                    variant='contained'>
                    Follow
                  </Button>
                </Box>
              </Paper>
            </Box>
          )}
          <Box mr={2} ml={2} mt={1}>
            <Paper elevation={1} sx={{ borderRadius: "10px" }}>
              <Box
                m={1}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}>
                <Typography variant='h6'>Explore</Typography>
                <Button variant='text' onClick={()=>navigate('/create-blog')}>Create Post</Button>
                <Button variant='text' >Events</Button>
                <Button variant='text' onClick={()=>navigate(`/account-settings/${user ? user.username : null}`)}>Bookmarks</Button>
                <Button variant='text' onClick={()=>navigate(`/account-settings/${user ? user.username : null}`)}>Profile</Button>
              </Box>
              <Box mr={2} ml={2} mt={1}>
                <Paper elevation={0} sx={{ borderRadius: "10px" }}>
                  {user ? null : (
                    <Box
                      m={1}
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                      }}>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <WorkspacePremiumIcon
                          sx={{
                            color: "#ECEC15",
                            width: "70px",
                            height: "60px",
                          }}
                        />
                        <Typography
                          ml={1}
                          sx={{
                            fontFamily: "Akarta",
                            WebkitTextStrokeWidth: "1px",
                            fontSize: "24px",
                          }}
                          variant='h6'>
                          Become a member
                        </Typography>
                      </Box>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <LoyaltyIcon />
                        <Typography ml={1} variant='subtitle1'>
                          Unlimited Featured Blogs
                        </Typography>
                      </Box>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <LoyaltyIcon />
                        <Typography ml={1} variant='subtitle1'>
                          Weekly Digest
                        </Typography>
                      </Box>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <LoyaltyIcon />
                        <Typography ml={1} variant='subtitle1'>
                          Get in touch with Community
                        </Typography>
                      </Box>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <LoyaltyIcon />
                        <Typography ml={1} variant='subtitle1'>
                          Write Your Blog
                        </Typography>
                      </Box>
                      <Box mt={3} mb={3} sx={{ width: "100%" }}>
                        <Button onClick={()=>navigate('/Signup')} sx={{ width: "100%" }} variant='contained'>
                          Signup
                        </Button>
                      </Box>
                    </Box>
                  )}
                </Paper>
              </Box>
            </Paper>
          </Box>
        </Grid>
      </Grid>
      <Grid container sx={{ justifyContent: "center" }}>
        <Grid item xs={10} md={8}>
          <form onSubmit={postComment}>
            <TextField
              variant='outlined'
              onChange={commentHandler}
              placeholder='Discuss ..'
              fullWidth
              multiline
              required
              inputProps={{
                maxLength: 150,
                minLength: 2,
              }}
            />
            <Button
              sx={{ marginTop: "10px" }}
              type='submit'
              variant='contained'>
              Submit
            </Button>
          </form>
        </Grid>
        <Grid item md={2}></Grid>
      </Grid>
      <Grid container sx={{ justifyContent: "center", marginTop: "20px" }}>
        <Grid item xs={12} md={8}>
          <Typography ml={1} variant='subtitle1'>
            Comments
          </Typography>
          <Paper
            elevation={1}
            sx={{ padding: "10px", maxHeight: "250px", overflowY: "auto" }}>
            {blog.comments
              ? blog.comments.reverse().map((result, i) => {
                  return (
                    <>
                      <Paper key={i} elevation={0}>
                        <Box
                          sx={{
                            display: "flex",
                            marginBottom: "10px",
                            padding: "8px",
                            justifyContent: "flex-start",
                            alignItems: "center",
                          }}>
                          <Avatar src={`${result.picture}`} />
                          <Typography ml={2} variant='subtitle1'>
                            {result.comment}
                          </Typography>
                        </Box>
                      </Paper>
                    </>
                  );
                })
              : null}
          </Paper>
        </Grid>
        <Grid item md={2}></Grid>
      </Grid>
      <Grid container sx={{ justifyContent: "space-around" }}>
        {user !== null && blog.author === user.username ? null : (
          <Grid item xs={10} sx={{ display: { xs: "block", md: "none" } }}>
            <Box mt={5} mb={5}>
              <Paper elevation={0}>
                <Box mb={2}>
                  <Typography variant='subtitle2'>Posted by</Typography>
                </Box>
                <Box
                  sx={{
                    width: "100%",
                    height: "50px",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}>
                  <Avatar
                    sx={{ width: 56, height: 56 }}
                    src={`${blog ? blog.picture : null}`}
                    alt='error'
                  />
                  <Typography
                    sx={{ margin: "10px", flexGrow: "1" }}
                    variant='h6'>
                    {blog ? blog.author : null}
                  </Typography>
                  <Box mt={1} sx={{ textAlign: "center" }}>
                    <Button
                      sx={{ width: "100%", marginBottom: "10px" }}
                      variant='contained'>
                      Follow
                    </Button>
                  </Box>
                </Box>
              </Paper>
            </Box>
          </Grid>
        )}
        <Grid item xs={12} md={8}>
          <Box mt={3}>
            <Typography variant='h5'>Similar Blogs</Typography>
            {moreblogs.map((result, i) => {
              return (
                <Paper key={i} elevationv={1} sx={{ padding: "5vh" }}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Avatar />
                    <Box ml={1}>
                      <Typography variant='subtitle1'>
                        {result.author}
                      </Typography>
                      <Typography variant='subtitle1'>{result.date}</Typography>
                    </Box>
                  </Box>
                  <Box>
                    <Typography variant='h6'>{result.heading}</Typography>
                  </Box>
                </Paper>
              );
            })}
          </Box>
        </Grid>
        <Grid item></Grid>
      </Grid>
    </>
  );
}

export default SpecifigBlog;
