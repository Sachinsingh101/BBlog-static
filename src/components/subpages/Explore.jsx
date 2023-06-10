import { Grid, Paper, Button, Box, Typography, Tabs,Tab} from "@mui/material";
import mask from "../images/mask.jpg";
import { useState } from "react";
function Explore() {
 const [value, setValue] =useState(0);
 const handleChange = (event, newValue) => {
    setValue(newValue);
  }
  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <Paper elevation={5} sx={{ width: "100%" }}>
            <img src={mask} alt='' style={{ width: "100%", height: "300px" }} />
            <Box mb={5} m={1} sx={{display:'flex',justifyContent:'center'}}>
               <Tabs value={value} onChange={(e,val)=>setValue(val)}>
                 <Tab label='Trending' />
                 <Tab label='Developers' />
                 <Tab label='Blogs'/>
               </Tabs>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}

export default Explore;
