import {
  Grid,
  Button,
  Typography,
  Paper,
  Box,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";
import img from "./images/bblog.png";
// import { useState } from 'react';
import { Link } from "react-router-dom";
function Signin() {
  const Google=()=>{
    window.open("https://revcode-service.onrender.com/auth/google","_self");
  }
  const Github=()=>{
    window.open("https://revcode-service.onrender.com/auth/github","_self");
  }
  return (
    <>
      <Grid container sx={{ justifyContent: "center" }}>
        <Grid
          item
          xs={10}
          md={4}
          sm={6}
          sx={{ background: "#BFD8D8", marginTop: "5rem", padding: "1px"}}>
          <Box>
            <Paper
              elevation={5}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems:'center',
                height:'25rem',
                padding:'10px'
              }}>
              <Box mt={3}>
                <Typography variant='h4'>SignIn</Typography>
              </Box>
              <Button onClick={Google} startIcon={<GoogleIcon/>} sx={{width:'100%',padding:'5px',marginTop:'3vh',backgroundColor:'#E7EAEE',color:'black','&:hover':{backgroundColor:'#CFD2D6'}}} variant='contained'>
                  Sign In with Google
              </Button>
              <Button onClick={Github} startIcon={<GitHubIcon/>} sx={{width:'100%',padding:'10px',marginTop:'3vh',backgroundColor:'black','&:hover':{backgroundColor:'#343539'}}} variant='contained'>
                  Sign In with GitHub
              </Button>
              <Typography variant='subtitle2' mt={2}>
                Don't have an account?
              </Typography>
              <Button variant='outlined' sx={{width:'100%',padding:'10px',marginTop:'2vh'}}>
                <Link to='/Signup'>SignUp</Link>
              </Button>
            </Paper>
          </Box>
        </Grid>
        <Grid
          item
          md={2}
          sm={3}
          sx={{
            marginTop: "5rem",
            background: "#BFD8D8",
            padding: "1px",
            display:{xs:'none',sm:'block'}
          }}>
          <Box>
            <Box
              sx={{
                width: "100%",
                height: "25rem",
                backgroundColor: "#BFD8D8",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}>
              <Box>
                <img src={img} alt='' />
              </Box>
              <Box>
                <Typography variant='h6'>Your way to Success</Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default Signin;
