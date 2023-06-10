import { Box, Typography, Grid, Button, Paper, Divider } from "@mui/material";
import { useEffect, useState } from "react";
import Profile from "./profile.jsx";
import Dashboard from "./dashboard.jsx";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
function Setting() {
  const [active, setActive] = useState("profile");
  const user=useSelector((state)=>state.users.user);
  const navigate=useNavigate()
  useEffect(()=>{
    user ? null : navigate('/Signup')
  },[])
  return (
    <>
      <Grid container sx={{ justifyContent: "center",backgroundColor:'#BDC3C7'}}>
        <Grid mt={2} item md={7} xs={12} sm={9} sx={{marginLeft:{md:'10px'}}}>
          <Paper elevation={3}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                padding: "20px",
                position: "relative",
              }}>
              {active === "profile" ? (
                <Button
                  variant='contained'
                  onClick={() => setActive("profile")}>
                  Profile
                </Button>
              ) : (
                <Button  variant='text' onClick={() => setActive("profile")}>
                  Profile
                </Button>
              )}
              {active === "dashboard" ? (
                <Button
                  variant='contained'
                  onClick={() => setActive("dashboard")}>
                  Dashboard
                </Button>
              ) : (
                <Button variant='text' onClick={() => setActive("dashboard")}>
                  Dashboard
                </Button>
              )}
            </Box>
            <Divider/>
            {active === "profile" ? (
              <Profile />
            ) : active === "dashboard" ? (
              <Dashboard />
            ) : null}
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}
export default Setting;
