import {
  Box,
  Typography,
  Paper,
  Avatar,
  TextField,
  Divider,
  IconButton,
  Button,
} from "@mui/material";
import { useSelector } from "react-redux";
// import { useState } from 'react';
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkIcon from "@mui/icons-material/Link";
import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import AddBoxIcon from "@mui/icons-material/AddBox";
function Profile() {
  const data = useSelector((state) => state.users.user);
  const [age, setAge] = useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [custoMize, setCustomize] = useState({
    dialog: "",
    about: "",
    gitLink: "",
    instaLink: "",
    linkedinLink: "",
    portfolioLink: "",
    skills: [],
    projects: [],
    profession: "",
    Education: "",
  });
  const submitHandler = async (e) => {
    console.log(data);
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/cutomize-profile", {
        userid: data._id,
        custoMize: custoMize,
      });
    } catch (err) {
      console.log("error while customizing error");
    }
  };
  const [temp, setTemp] = useState({
    skills: "",
    projects: "",
  });

  const addToSkills = () => {
    if (temp.skills === "") {
      alert("Skill cannot be empty");
    } else if (custoMize.skills.length < 5) {
      setCustomize({
        ...custoMize,
        skills: [...custoMize.skills, temp.skills],
      });
    } else {
      alert("Maximu five skills are allowed");
    }
    setTemp({
      ...temp,
      skills: "",
    });
  };
  const addToProjects = () => {
    if (temp.projects === "") {
      alert("Projects cannot be empty");
    } else if (custoMize.projects.length < 3) {
      setCustomize({
        ...custoMize,
        projects: [...custoMize.projects, temp.projects],
      });
    } else {
      alert("Maximu Three projects are allowed");
    }
    setTemp({
      ...temp,
      projects: "",
    });
  };

  return (
    <>
      <Box mb={5}>
        <Paper
          elevation={0}
          sx={{
            display: "flex",
            alignItems: "start",
            flexDirection: "column",
            height: "100%",
            paddingTop: "10px",
          }}>
          <Box sx={{ display: "flex", justifyContent: "center" }} ml={1} mr={1} mb={2}>
            <Avatar
              sx={{ flexGrow: "1", width: 100, height: 100 }}
              alt={data ? data.username : null}
              src={`${data ? data.picture : null}`}
            />
            <Box ml={3} sx={{ textAlign: "left" }}>
              <Box sx={{ display: "flex",flexDirection:{xs:'column',sm:'row'} }} mb={2}>
                <Typography mr={3} variant='h6'>
                  {data ? data.username : "Your Username here"}
                </Typography>
                <Button variant='outlined' onClick={handleClickOpen}>
                  Edit Profile
                </Button>
              </Box>
              <Box>
                <Typography m={2} variant='p'>
                  0 posts
                </Typography>
                <Typography m={2} variant='p'>
                  0 followers
                </Typography>
                <Typography m={2} variant='p'>
                  {data ? data.bookmarks.length : '0'} Bookmarks
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
              sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
              {data ? data.about : "Your about section here"}
            </Box>
            <Typography variant='h6'>Social</Typography>
            <Box
              mb={2}
              sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
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
              sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
              <Box sx={{display:'flex',flexWrap:'wrap'}}>
                {
                  data ? data.skills.map((result,i)=>{
                    return(
                      <Typography sx={{marginLeft:'5px',backgroundColor:'#F8CA0D',padding:'5px',borderRadius:'10px'}} variant='h6'>{result}</Typography>
                    );
                  }): null
                }
              </Box>
            </Box>
            <Typography variant='h6'>Featured Projects</Typography>
             {
              data ? data.projects.map((result,i)=>{
                return(
                  <Paper elevation={4} sx={{ padding: "5px",marginBottom:'10px' }}>
                   <Box
                    key={i}
                    sx={{
                      width: "100%",
                      height: "15vh",
                      backgroundColor:'#B682A0'
                    }}></Box>
                   <Typography varaint='subtitle2'><a href={`${result}`}>Project {i}</a></Typography>
                  </Paper>
                );
              }) : null
             }
            <Typography variant='h6'>Work</Typography>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography variant='p'>Education</Typography>
              <TextField value={`${data ? data.Education : "Your Education"}`} disabled />
              <Typography variant='p'>Profession</Typography>
              <TextField value={`${data ? data.profession : "Your profession"}`} disabled />
            </Box>
          </Box>
        </Paper>
      </Box>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Customization</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Your Profile should be updated and should speak what the hell are
            you ?
          </DialogContentText>
          <form onSubmit={submitHandler}>
            <Typography variant='h6'>Personal</Typography>
            <TextField
              onChange={(e) =>
                setCustomize({
                  ...custoMize,
                  dialog: e.target.value,
                })
              }
              sx={{ marginTop: "10px" }}
              variant='outlined'
              label='Your Dialog'
              fullWidth
              required
            />
            <TextField
              onChange={(e) =>
                setCustomize({
                  ...custoMize,
                  about: e.target.value,
                })
              }
              sx={{ marginTop: "10px" }}
              variant='outlined'
              label='About Me'
              fullWidth
              required
            />
            <Divider />
            <Typography variant='h6'>Social</Typography>
            <TextField
              onChange={(e) =>
                setCustomize({
                  ...custoMize,
                  gitLink: e.target.value,
                })
              }
              sx={{ marginTop: "10px" }}
              variant='outlined'
              label='Github Profile Link here'
              fullWidth
              required
            />
            <TextField
              onChange={(e) =>
                setCustomize({
                  ...custoMize,
                  linkedinLink: e.target.value,
                })
              }
              sx={{ marginTop: "10px" }}
              variant='outlined'
              label='Linkedin Profile Link here'
              fullWidth
              required
            />
            <TextField
              onChange={(e) =>
                setCustomize({
                  ...custoMize,
                  instaLink: e.target.value,
                })
              }
              sx={{ marginTop: "10px" }}
              variant='outlined'
              label='Instagaram Profile Link here'
              fullWidth
              required
            />
            <TextField
              onChange={(e) =>
                setCustomize({
                  ...custoMize,
                  portfolioLink: e.target.value,
                })
              }
              sx={{ marginTop: "10px" }}
              variant='outlined'
              label='Portfolio Link here'
              fullWidth
              required
            />
            <Typography variant='h6'>Skills You own</Typography>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <TextField
                value={temp.skills}
                onChange={(e) =>
                  setTemp({
                    ...temp,
                    skills: e.target.value,
                  })
                }
                variant='outlined'
                label='Add your skills'
                fullwidth
              />
              <Button
                onClick={addToSkills}
                sx={{ fontSize: "18px", margin: "10px" }}
                variant='outlined'
                startIcon={<AddBoxIcon />}>
                Save
              </Button>
            </Box>
            <p style={{ color: "red" }}>
              {custoMize.skills.length >= 5
                ? "Maximum Five skills Allowed"
                : null}
            </p>
            <Box sx={{ width: "100%", display: "flex", flexWrap: "wrap" }}>
              {custoMize.skills.map((result, i) => {
                return (
                  <Typography
                    sx={{
                      backgroundColor: "#F0C805",
                      padding: "10px",
                      margin: "2px",
                      borderRadius: "10px",
                    }}
                    variant='h6'>
                    {result}
                  </Typography>
                );
              })}
            </Box>
            <Box>
              <Typography variant='h6'>Projects</Typography>
              <TextField
                value={temp.projects}
                onChange={(e) =>
                  setTemp({
                    ...temp,
                    projects: e.target.value,
                  })
                }
                variant='outlined'
                label='Projects Links here'
                fullwidth
              />
              <Button
                onClick={addToProjects}
                sx={{ fontSize: "18px", margin: "10px" }}
                variant='outlined'
                startIcon={<AddBoxIcon />}>
                Save
              </Button>
            </Box>
            <p style={{ color: "red" }}>
              {custoMize.projects.length == 3
                ? "Maximus Three Projects allowed"
                : null}
            </p>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              {custoMize.projects.map((result, i) => {
                return (
                  <a key={i} href={`${result}`}>
                    Project{i}
                  </a>
                );
              })}
            </Box>
            <Typography variant='h6'>Work</Typography>
            <TextField
              onChange={(e) =>
                setCustomize({
                  ...custoMize,
                  profession: e.target.value,
                })
              }
              variant='outlined'
              label='Profession'
              fullWidth
            />
            <TextField
              onChange={(e) =>
                setCustomize({
                  ...custoMize,
                  Education: e.target.value,
                })
              }
              sx={{ marginTop: "10px" }}
              variant='outlined'
              label='Education'
              fullWidth
            />
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type='submit'>Submit</Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
export default Profile;
