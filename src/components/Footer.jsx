import { Grid,Box,Typography,Button} from '@mui/material'
import { Link } from 'react-router-dom';

function Footer(){
    return(
        <>
          <Grid container sx={{justifyContent:'center',backgroundColor:'#F2F3F4',padding:'20px'}}>
            <Grid item md={12} sx={{textAlign:'center'}}>
              <Box>
                <Typography variant='h6'>BBlog community</Typography>
                <Typography variant='subtitle1'>“If you want to shine like a sun, first burn like a sun.”</Typography>
              </Box>
              <Box spacing sx={{fontSize:'20px',display:'flex',flexWrap:'wrap',justifyContent:'center'}}>
                <Box m={1}><Link to=''><Typography sx={{color:'black',textDecoration:'none'}} variant='h6'>Home</Typography></Link></Box>
                <Box m={1}><Link to=''><Typography sx={{color:'black',textDecoration:'none'}} variant='h6'>Explore</Typography></Link></Box>
                <Box m={1}><Link to=''><Typography sx={{color:'black',textDecoration:'none'}} variant='h6'>Bookmarks</Typography></Link></Box>
                <Box m={1}><Link to=''><Typography sx={{color:'black',textDecoration:'none'}} variant='h6'>Write</Typography></Link></Box>
                <Box m={1}><Link to=''><Typography sx={{color:'black',textDecoration:'none'}} variant='h6'>Signup</Typography></Link></Box>
                <Box m={1}><Link to=''><Typography sx={{color:'black',textDecoration:'none'}} variant='h6'>AboutUs</Typography></Link></Box>
              </Box>
              <Box>
                <Typography variant='subtitle2'>Allrights Reserved @2023</Typography>
              </Box>
            </Grid>
          </Grid>
        </>
    );
}

export default Footer;