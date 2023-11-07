import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";

import { Grid, Typography, Paper, Button, TextField, Box } from "@mui/material";
import axios from "axios";
import img from "./images/bblog.png";

function Editors() {
  const navigate = useNavigate();
  const [ispublished, setpublish] = useState(false);
  const [value, setValue] = useState("");
  const users = useSelector((state) => state.users.user);
  const [post, setpost] = useState({
    userId:users._id,
    author: "",
    picture: "",
    email: "",
    image: "",
    heading: "",
  });

  const imageHandler = (e) => {
    setpost({
      ...post,
      image: e.target.files[0],
    });
  };
  const headingHandler = (e) => {
    setpost({
      ...post,
      heading: e.target.value,
    });
  };
  
  // Function to handle Posting Blogs 

  const publishHandler = async (e) => {
    e.preventDefault();
    try {
      const formdata = new FormData();
      formdata.append("userId",post.userId);
      formdata.append("image", post.image);
      formdata.append("heading", post.heading);
      formdata.append("content", value);
      formdata.append("author", users.username);
      formdata.append("email", users.email);
      formdata.append("picture", users.picture);
      setpublish(true);
      await axios
        .post("http://localhost:5021/publish-blog", formdata)
        .then((res) => {console.log("Blog published successfully")});
    } catch (err) {
      console.log("error while publishing a blog", err);
    }
  };
  
  //Redirect after successful Publish

  if(ispublished){
    setTimeout(()=>{
      navigate('/')
    },4000)
  }

  // React Quill settings 

  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }],
      [{ size: [] }],
      ["bold", "italic", "code-block", "underline", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link"],
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    },
  };

  //  React Quill setting 

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "align",
    "strike",
    "script",
    "blockquote",
    "background",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "color",
    "code-block",
  ];
  return (
    <>
      <Grid container sx={{ paddingTop: "5vh", backgroundColor: "#ECF0F1" }}>
        <Grid item md={2}></Grid>
        <Grid item md={8} sx={{ paddingBottom: "50px" }}>
          <Box mb={2} sx={{ display: "flex", alignItems: "center" }}>
            <img style={{ height: "60px" }} src={img} alt="" />
            <Typography sx={{ marginX: "5vh" }} variant="h6">
              Create Your Post
            </Typography>
          </Box>
          <Box>
            <Box sx={{ display: "flex", justifyContent: "end" }}>
              <Typography
                variant="subtitle1"
                sx={{
                  marginX: "10px",
                  cursor: "pointer",
                  textAlign: "end",
                  "&:hover": { color: "blue" },
                }}
              >
                Edit
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{
                  marginX: "5px",
                  cursor: "pointer",
                  textAlign: "end",
                  "&:hover": { color: "blue" },
                }}
              >
                Preview
              </Typography>
            </Box>
            <Paper elevation={5} sx={{ padding: "5vh" }}>
              <form encType="multipart/form-data" onSubmit={publishHandler}>
                <Box mb={3}>
                  <Typography variant="h6">Choose Your Cover Image</Typography>
                  <TextField
                    required
                    name="image"
                    onChange={imageHandler}
                    type={"file"}
                  />
                </Box>
                <Box mb={3}>
                  <TextField
                    required
                    label="Enter Post Title"
                    type={"text"}
                    inputProps={{ maxLength: 85 }}
                    sx={{ width: "100%" }}
                    onChange={headingHandler}
                  />
                </Box>
                <ReactQuill
                  style={{ height: "25vh", marginBottom: "50px" }}
                  placeholder="Write here ....."
                  theme="snow"
                  value={value}
                  formats={formats}
                  modules={modules}
                  onChange={setValue}
                />
                <Box sx={{ display: "flex" }} mt={4}>
                  <Box>
                    {ispublished ? (
                      <Button style={{marginTop:'20px'}} disabled variant="contained">
                        <CircularProgress
                          sx={{ color: "white"}}
                        />
                        <span style={{margin:'2px'}}>Publishing</span>
                      </Button>
                    ) : (
                      <Button variant="contained" type="submit">
                        Publish
                      </Button>
                    )}
                  </Box>
                  {/* <Box mx={4}>
                <Button variant="outlined">Draft</Button>
              </Box> */}
                </Box>
              </form>
            </Paper>
          </Box>
          <Box />
        </Grid>
        <Grid item md={2}></Grid>
      </Grid>
    </>
  );
}

export default Editors;
