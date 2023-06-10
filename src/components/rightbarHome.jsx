import { Box, Typography, Paper, IconButton, Avatar } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Rightbar() {
  var Blogs = new Array();
  const navigate=useNavigate();
  Blogs = useSelector((state) => state.blogs.blogs);
  return (
    <>
      <Box ml={1}>
        <Paper elevation={1} sx={{ padding: "1vh" }}>
          <Box>
            <Typography variant='subtitle1'>
              Trending Blogs You might Read
            </Typography>
            <Box sx={{ fontSize: "70%" }}>
              {Blogs.map((result,i) => {
                return (
                  <Paper
                    onClick={()=>navigate(`/${result._id}`)}
                    key={i}
                    elevation={0}
                    sx={{
                      padding: "2vh",
                      marginTop: "1vh",
                      "&:hover": {
                        backgroundColor: "#E2E3F7",
                        cursor: "pointer",
                      },
                    }}>
                    <Box ml={2} sx={{ display: "flex", alignItems: "center" }}>
                      <Avatar src={`${result.picture ? result.picture : null}`} />
                      <Box mx={1}>
                        <Typography variant='subtitle1'>
                          {result.author ? result.author : null}
                        </Typography>
                        <Typography variant='subtitle2'>mar 14</Typography>
                      </Box>
                    </Box>
                    <Box ml={5}>
                      <h2>{result.heading ? result.heading : null} </h2>
                    </Box>
                  </Paper>
                );
              })}
              <Typography variant='subtitle2'>
                <IconButton>
                  <ExpandMoreIcon sx={{ rotate: "270deg", margin: "5px" }} />
                </IconButton>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Box>
    </>
  );
}
export default Rightbar;
