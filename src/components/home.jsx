import {
  Grid,
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import DefaulthomePage from './defaultHomepage';
import LeftHomeBar from "./LeftbarHome";
import SearchPage from './searchPage.jsx';
import Rightbar from './rightbarHome';
import { useEffect } from 'react';

function Home() {

  return (
    <>
      <Grid container sx={{display:'flex',justifyContent:'center'}}>
        <Grid item xs={3} md={2} sx={{ display: { xs: "none", sm: "block" } }}>
          <LeftHomeBar />
        </Grid>
        <Grid item sm={8} xs={12} md={6} lg={7} ml={1} mt={1}>
          <DefaulthomePage/>
        </Grid>
        <Grid item  md={3} lg={2} sx={{display:{xs:'none',md:'block'}}} ml={1} mt={1}>
          <Rightbar/>
        </Grid>
      </Grid>
    </>
  );
}
export default Home;
