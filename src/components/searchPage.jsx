import {
  Paper,
  Box,
  Tabs,
  Tab,
  Divider,
  Avatar,
  Typography,
  Skeleton,
  Grid,
} from "@mui/material";
import { useState } from "react";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchSearchResult } from "../features/searchSlice";
import LeftHomeBar from "./LeftbarHome.jsx";
function SearchPage() {
  const dispatch = useDispatch();
  const searchedBlogs = useSelector((state) => state.search.searchedBlogs);
  const searchedUsers = useSelector((state) => state.search.searchedUsers);
  const navigate = useNavigate();
  var blogs = new Array();
  blogs = useSelector((state) => state.blogs.blogs);
  const [value, setValue] = useState("2");
  const [search, setSearch] = useState("");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Grid container sx={{justifyContent:'center',marginTop:{md:'10px'}}}>
        <Grid item md={2} sx={{display:{xs:'none',md:'block'}}}>
          <LeftHomeBar/>
        </Grid>
        <Grid item xs={12} md={8} sx={{marginLeft:{md:'10px'}}}>
          <Paper elevation={3} sx={{ minHeight: "100vh", width: "100%" }}>
            <Box
              mb={1}
              mt={2}
              sx={{ display: { xs: "block", md: "none" }, width: "100%" }}>
              <form
                onSubmit={(e) => {
                  dispatch(fetchSearchResult(e, search));
                }}>
                <input
                  autoFocus
                  value={search}
                  id='focus'
                  required
                  minLength={3}
                  onChange={(e) => setSearch(e.target.value)}
                  type='search'
                  placeholder='Search for Blogs People and Events'
                  style={{
                    height: "40px",
                    width: "100%",
                    borderRadius: "20px",
                    textAlign: "center",
                    fontFamily: "Alfa Slab one",
                    fontSize: "15px",
                    borderWidth: "0.1px",
                    marginTop: "10px",
                  }}
                />
                {search ? (
                  <p style={{ textAlign: "center", fontFamily: "cursive" }}>
                    Press Enter to search
                  </p>
                ) : null}
              </form>
            </Box>
            <Divider />
            <Box sx={{ width: "100%", typography: "body1" }}>
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <TabList
                    onChange={handleChange}
                    aria-label='lab API tabs example'>
                    <Tab label='Latest' value='1' />
                    <Tab label='Blogs' value='2' />
                    <Tab label='People' value='3' />
                    <Tab label='Events' value='4' />
                  </TabList>
                </Box>
                <TabPanel value='1'>
                  {blogs.map((result, i) => {
                    return (
                      <>
                        <Paper
                          key={i}
                          elevation={1}
                          onClick={() =>
                            navigate(`/${result._id ? result._id : null}`)
                          }
                          sx={{
                            "&:hover": {
                              cursor: "pointer",
                              backgroundColor: "#E2E3F7",
                            },
                          }}>
                          <Box
                            mb={2}
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              padding: "5px",
                            }}>
                            <Box sx={{ flexGrow: "1" }}>
                              <Box
                                sx={{ display: "flex", alignItems: "center" }}>
                                <Avatar
                                  src={`${
                                    result.picture ? result.picture : null
                                  }`}
                                />
                                <Typography ml={2} variant='subtitle1'>
                                  {result.author ? result.author : null}
                                </Typography>
                              </Box>
                              <Box>
                                <Typography variant='h6'>
                                  {result.heading ? result.heading : null}
                                </Typography>
                              </Box>
                            </Box>
                            <img
                              src={`${result.image ? result.image : null}`}
                              style={{ width: "20vw", height: "20vh" }}
                            />
                          </Box>
                        </Paper>
                      </>
                    );
                  })}
                </TabPanel>
                <TabPanel value='2'>
                  {searchedBlogs.map((data, i) => {
                    return (
                      <>
                        <Paper
                          
                          key={i}
                          elevation={1}
                          onClick={() =>
                            navigate(`/${data._id ? data._id : null}`)
                          }
                          sx={{
                            "&:hover": {
                              cursor: "pointer",
                              backgroundColor: "#E2E3F7",
                            },
                          }}>
                          <Box
                            mb={2}
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              padding: "5px",
                            }}>
                            <Box sx={{ flexGrow: "1" }}>
                              <Box
                                sx={{ display: "flex", alignItems: "center" }}>
                                <Avatar
                                  src={`${data.picture ? data.picture : null}`}
                                />
                                <Typography ml={2} variant='subtitle1'>
                                  {data.author ? data.author : null}
                                </Typography>
                              </Box>
                              <Box>
                                <Typography variant='h6'>
                                  {data.heading ? data.heading : null}
                                </Typography>
                              </Box>
                            </Box>
                            <img
                              src={`${data.image ? data.image : null}`}
                              style={{ width: "20vw", height: "20vh" }}
                            />
                          </Box>
                        </Paper>
                      </>
                    );
                  })}
                  {searchedBlogs.length == 0 ? (
                    <Typography variant='h6'>
                      Search for your favourites
                      <Skeleton height={200} sx={{ marginTop: "-3vh" }} />
                      <Skeleton height={200} sx={{ marginTop: "-8vh" }} />
                      <Skeleton height={200} sx={{ marginTop: "-8vh" }} />
                    </Typography>
                  ) : null}
                </TabPanel>
                <TabPanel value='3'>
                  {searchedUsers.map((userData, i) => {
                    return (
                      <>
                        <Paper
                         sx={{'&:hover':{cursor:'pointer'},margin:'10px'}}
                         onClick={()=>navigate(`/View-Profile/${userData._id}/${userData.username}`)}
                         key={i} elevation={1}>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              padding: "10px",
                            }}>
                            <Avatar
                              src={`${
                                userData.picture ? userData.picture : null
                              }`}
                            />
                            <Typography ml={2} variant='subtitle1'>
                              {userData.username ? userData.username : null}
                            </Typography>
                          </Box>
                        </Paper>
                      </>
                    );
                  })}
                  {searchedUsers.length == 0 ? (
                    <>
                      <Typography variant='h6'>
                        Search for People to get Connected
                      </Typography>
                      <Paper elevation={1}>
                        <Box mb={1} sx={{ display: "flex", padding: "10px" }}>
                          <Skeleton variant='circular' width={56} height={56} />
                          <Skeleton
                            sx={{ marginLeft: "10px" }}
                            variant='text'
                            width={200}
                            height={56}
                          />
                        </Box>
                      </Paper>
                      <Paper elevation={1}>
                        <Box mb={1} sx={{ display: "flex", padding: "10px" }}>
                          <Skeleton variant='circular' width={56} height={56} />
                          <Skeleton
                            sx={{ marginLeft: "10px" }}
                            variant='text'
                            width={200}
                            height={56}
                          />
                        </Box>
                      </Paper>
                      <Paper elevation={1}>
                        <Box mb={1} sx={{ display: "flex", padding: "10px" }}>
                          <Skeleton variant='circular' width={56} height={56} />
                          <Skeleton
                            sx={{ marginLeft: "10px" }}
                            variant='text'
                            width={200}
                            height={56}
                          />
                        </Box>
                      </Paper>
                      <Paper elevation={1}>
                        <Box mb={1} sx={{ display: "flex", padding: "10px" }}>
                          <Skeleton variant='circular' width={56} height={56} />
                          <Skeleton
                            sx={{ marginLeft: "10px" }}
                            variant='text'
                            width={200}
                            height={56}
                          />
                        </Box>
                      </Paper>
                      <Paper elevation={1}>
                        <Box mb={1} sx={{ display: "flex", padding: "10px" }}>
                          <Skeleton variant='circular' width={56} height={56} />
                          <Skeleton
                            sx={{ marginLeft: "10px" }}
                            variant='text'
                            width={200}
                            height={56}
                          />
                        </Box>
                      </Paper>
                    </>
                  ) : null}
                </TabPanel>
                <TabPanel value='4'>
                  <Typography variant='h6'>No Events Running now</Typography>
                </TabPanel>
              </TabContext>
            </Box>
            <Divider />
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}

export default SearchPage;
