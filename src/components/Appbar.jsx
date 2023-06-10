import {
  Box,
  Paper,
  AppBar,
  Toolbar,
  Button,
  Avatar,
  IconButton,
  TextField,
  InputAdornment,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import bblog from "./images/bblog.png";
import { useState } from "react";
import Popper from "@mui/material/Popper";
import SearchOutlined from "@mui/icons-material/SearchOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import Drawers from "./Drawer.jsx";
import Divider from "@mui/material/Divider";
import { Link, useNavigate } from "react-router-dom";
import { fetchUser } from "../features/fetchUser.jsx";
import { useSelector, useDispatch } from "react-redux";
import { useMemo } from "react";
import { fetchBlogsPosts } from "../features/fetchBlogs.jsx";
import { fetchSearchResult } from "../features/searchSlice";
import axios from "axios";

function Appbar() {
  const navigate=useNavigate();
  const singleUser = useSelector((state) => state.users.user);
  const dispatch = useDispatch();
  const  [search,setSearch]=useState("");
  useMemo(() => {
    dispatch(fetchUser());
  }, []);
  
  useMemo(() => {
    dispatch(fetchBlogsPosts());
  }, []);

  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };
  const Logout = async () => {
    axios
      .get("http://localhost:5000/api/logout", { withCredentials: "include" })
      .then((res) => {});
  };

  const opens = Boolean(anchorEl);
  const id = opens ? "simple-popper" : undefined;


  return (
    <>
      <AppBar sx={{ backgroundColor: "#F6F0F2", position: "relative" }}>
        <Toolbar>
          <Drawers />
          <Box mx={2} sx={{ flexGrow: { xs: "1", md: "0" } }}>
            <img src={bblog} alt='' style={{ height: "50px" }} />
          </Box>
          <Box sx={{ flexGrow: "1", display: { xs: "none", md: "block" } }}>
            <form onSubmit={(e)=>dispatch(fetchSearchResult(e,search))}>
              <TextField
                autoFocus
                onChange={(e)=>{
                  setSearch(e.target.value)
                  navigate('/Search')
                }}
                sx={{ width: "60%" }}
                placeholder='search for Articles people and more...'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <SearchOutlined />
                    </InputAdornment>
                  ),
                }}
              />
            </form>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", padding: "10px" }}>
            <Link to='/create-blog'>
              {singleUser ? (
                <Button
                  variant='outlined'
                  sx={{
                    color: "blue",
                    borderColor: "blue",
                    "&:hover": {
                      backgroundColor: "blue",
                      color: "white",
                      fontStyle: "bold",
                    },
                    display: { xs: "none", sm: "block" },
                  }}>
                  Create Post
                </Button>
              ) : null}
            </Link>
            <Box>
              <IconButton>
                <DarkModeOutlinedIcon />
              </IconButton>
            </Box>
            {singleUser ? (
              <IconButton onClick={handleClick}>
                <Avatar
                  alt={`${singleUser ? singleUser.username : null}`}
                  src={`${singleUser ? singleUser.picture : null}`}
                />
              </IconButton>
            ) : (
              <Link to='/Signup'>
                <Button variant='contained'>Signup</Button>
              </Link>
            )}
            <Popper 
              id={id} open={opens} anchorEl={anchorEl}>
              <Box mt={2} sx>
                <Paper
                  elevation={5}
                  sx={{
                    textAlign: "center",
                    marginRight: "3vh",
                    width: "200px",
                    padding: "2px",
                  }}>
                  <Box pt={1} mb={1}>
                    <Typography variant='h6' className='dashboardelement'>
                      {singleUser ? singleUser.username : "User name"}
                    </Typography>
                  </Box>
                  <Divider />
                  <Box
                    m={1}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}>
                    <Typography
                      onClick={()=>navigate(`/account-settings/${singleUser ? singleUser.username : null}`)}
                      className='dashboardelement'
                      variant='subtitle1'>
                      DashBoard
                    </Typography>
                    <Typography
                      onClick={()=>navigate('/create-blog')}
                      className='dashboardelement'
                      variant='subtitle1'>
                      Create Post
                    </Typography>
                    <Typography
                      onClick={()=>navigate(`/account-settings/${singleUser ? singleUser.username : null}`)}
                      className='dashboardelement'
                      variant='subtitle1'>
                      Bookmarks
                    </Typography>
                    <Link
                      to={`/account-settings/${
                        singleUser ? singleUser.username : null
                      }`}>
                      <Typography
                        className='dashboardelement'
                        variant='subtitle1'>
                        Settings
                      </Typography>
                    </Link>
                    <CloseIcon
                      sx={{ marginY: "5px", cursor: "pointer" }}
                      onClick={() => setAnchorEl(false)}
                    />
                  </Box>
                  <Divider />
                  <Button
                    onClick={Logout}
                    sx={{ marginTop: "10px" }}
                    variant='outlined'>
                    Logout
                  </Button>
                </Paper>
              </Box>
            </Popper>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Appbar;
