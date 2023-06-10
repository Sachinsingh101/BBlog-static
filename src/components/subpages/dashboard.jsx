import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Box, Divider, Paper, Tab, Typography } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom'

function Dashboard() {
  const navigate=useNavigate();
  const [value, setValue] = useState("1");
  const blogs = useSelector((state) => state.blogs.blogs);
  const user = useSelector((state) => state.users.user);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <Box
        mb={3}
        sx={{ width: "100%", typography: "body1", minHeight: "90vh" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label='lab API tabs example'>
              <Tab label='Posts' value='1' />
              <Tab label='Bookmarks' value='2' />
              <Tab label='Follwers' value='3' />
            </TabList>
          </Box>
          <TabPanel value='1'>
            <Paper elevation={2}>
              {blogs.map((result) => {
                return (
                  <>
                   {
                    result.email===user.email ? 
                    <Box>
                      <Box m={3}>
                        <Typography sx={{color:'#1E6BE0','&:hover':{cursor:'pointer'}}}
                         variant='h6'
                         onClick={() => navigate(`/${result._id}`)}
                        >
                          {result.heading}
                      </Typography>
                        <Box sx={{display:'flex'}}>
                          <Typography variant='subtitle1'>{result.likes.length} Likes</Typography>
                          <Typography ml={2} variant='subtitle1'>{result.comments.length} Comments</Typography>
                          <Typography ml={2} variant='subtitle1'>Edit</Typography>
                          <Typography ml={2} variant='subtitle1'>Delete</Typography>
                        </Box>
                      </Box>
                      <Divider/>
                    </Box>
                     : null
                   }
                  </>
                );
              })}
            </Paper>
          </TabPanel>
          <TabPanel value='2'>
            <Paper elevation={1}>
              {
                user.bookmarks.map((bookmarks)=>{
                  return <><Typography  style={{padding:'5px'}} variant='h6'><a href={`${bookmarks.url}`}>{bookmarks.heading}</a></Typography><Divider/></>
                })
              }
            </Paper>
          </TabPanel>
          <TabPanel value='3'>This Feature is in Development</TabPanel>
        </TabContext>
      </Box>
    </>
  );
}

export default Dashboard;
