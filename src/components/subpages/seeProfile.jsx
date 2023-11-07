import { useMemo, useState } from "react";
import {
    Box,
    Typography,
    Paper,
    Avatar,
    TextField,
    Divider,
    IconButton,
    Grid
  } from "@mui/material";
  import GitHubIcon from "@mui/icons-material/GitHub";
  import LinkedInIcon from "@mui/icons-material/LinkedIn";
  import InstagramIcon from "@mui/icons-material/Instagram";
  import LinkIcon from "@mui/icons-material/Link";
import axios from "axios";
import { useParams } from "react-router-dom";
function ViewProfile() {
  const Params = useParams();
  const [data, setUser] = useState(null);
  console.log(data);
  useMemo(async () => {
    try {
      await axios
        .get(`https://revcode-service.onrender.com/user-profile/${Params.id}`)
        .then((res) => {
          setUser(res.data);
          //  console.log(res.data)
        });
    } catch (err) {
      console.log("error while viewing user Profile", err);
    }
  }, []);
  return (
    <Grid container sx={{ justifyContent: "center" }}>
      <Grid item md={5}>
        {data ? (
          <Box mb={5} mt={5}>
            <Paper
              elevation={3}
              sx={{
                display: "flex",
                alignItems: "start",
                flexDirection: "column",
                height: "100%",
                padding: "20px",
              }}>
              <Box
                sx={{ display: "flex", justifyContent: "center" }}
                ml={1}
                mr={1}
                mb={2}>
                <Avatar
                  sx={{ flexGrow: "1", width: 100, height: 100 }}
                  alt={data ? data.username : null}
                  src={`${data ? data.picture : null}`}
                />
                <Box ml={3} sx={{ textAlign: "left" }}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: { xs: "column", sm: "row" },
                    }}
                    mb={2}>
                    <Typography mr={3} variant='h6'>
                      {data ? data.username : "Your Username here"}
                    </Typography>
                    
                  </Box>
                  <Box>
                    <Typography m={2} variant='p'>
                      0 posts
                    </Typography>
                    <Typography m={2} variant='p'>
                      0 followers
                    </Typography>
                    <Typography m={2} variant='p'>
                      {data ? data.bookmarks.length : "0"} Bookmarks
                    </Typography>
                  </Box>
                  <Typography mt={2} varaint='subtitle2'>
                    {data ? data.dialog : "Your dialog here"}
                  </Typography>
                </Box>
              </Box>
              <Divider />
              <Box ml={3}>
                <Typography variant='h6'>About Me</Typography>
                <Box
                  mb={2}
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                  }}>
                  {data.about ? data.about : "Profile not updated"}
                </Box>
                <Typography variant='h6'>Social</Typography>
                <Box
                  mb={2}
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                  }}>
                  <IconButton>
                    <a href={`${data ? data.gitLink : null}`}>
                      <GitHubIcon />
                    </a>
                  </IconButton>
                  <IconButton>
                    <a href={`${data ? data.linkedinLink : null}`}>
                      <LinkedInIcon />
                    </a>
                  </IconButton>
                  <IconButton>
                    <a href={`${data ? data.instaLink : null}`}>
                      <InstagramIcon />
                    </a>
                  </IconButton>
                  <IconButton>
                    <a href={`${data ? data.portfolioLink : null}`}>
                      <LinkIcon />
                    </a>
                  </IconButton>
                </Box>
                <Typography variant='h6'>My Skills</Typography>
                <Box
                  mt={2}
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                  }}>
                  <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                    {data
                      ? data.skills.map((result, i) => {
                          return (
                            <Typography
                              sx={{
                                marginLeft: "5px",
                                backgroundColor: "#F8CA0D",
                                padding: "5px",
                                borderRadius: "10px",
                              }}
                              variant='h6'>
                              {result}
                            </Typography>
                          );
                        })
                      : null}
                  </Box>
                </Box>
                <Typography variant='h6'>Featured Projects</Typography>
                {data
                  ? data.projects.map((result, i) => {
                      return (
                        <Paper
                          elevation={4}
                          sx={{ padding: "5px", marginBottom: "10px" }}>
                          <Box
                            key={i}
                            sx={{
                              width: "100%",
                              height: "15vh",
                              backgroundColor: "#B682A0",
                            }}></Box>
                          <Typography varaint='subtitle2'>
                            <a href={`${result}`}>Project {i}</a>
                          </Typography>
                        </Paper>
                      );
                    })
                  : null}
                <Typography variant='h6'>Work</Typography>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <Typography variant='p'>Education</Typography>
                  <TextField
                    value={`${data ? data.Education : "Your Education"}`}
                    disabled
                  />
                  <Typography variant='p'>Profession</Typography>
                  <TextField
                    value={`${data ? data.profession : "Your profession"}`}
                    disabled
                  />
                </Box>
              </Box>
            </Paper>
          </Box>
        ) : null}
      </Grid>
    </Grid>
  );
}

export default ViewProfile;
