import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useSelector } from "react-redux";
import {
  Grid,
  Typography,
  Paper,
  Button,
  TextField,
  Box
} from "@mui/material";
import axios from "axios";
import img from "./images/bblog.png";


function Editors() {

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
  const publishHandler = async () => {
    try {
      const formdata = new FormData();
      formdata.append('userId',post.userId);
      formdata.append("image", post.image);
      formdata.append("heading", post.heading);
      formdata.append("content", value);
      formdata.append("author",users.username);
      formdata.append("email",users.email);
      formdata.append("picture",users.picture);
       await axios
        .post("https://bblog-blogging-site.onrender.com/publish-blog", formdata)
        .then((res) => {
          console.log(res.data);
        });
    } catch (err) {
      console.log("error while publishing a blog", err);
    }
  };
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
      <Grid
        container
        sx={{ paddingTop: "5vh", backgroundColor: "#ECF0F1" }} >
        <Grid item md={2}></Grid>
        <Grid item md={8} sx={{paddingBottom:'50px'}}>
          <Box mb={2} sx={{ display: "flex", alignItems: "center" }}>
            <img style={{ height: "60px" }} src={img} alt='' />
            <Typography sx={{ marginX: "5vh" }} variant='h6'>
              Create Your Post
            </Typography>
          </Box>
          <Box>
            <Box sx={{ display: "flex", justifyContent: "end" }}>
              <Typography
                variant='subtitle1'
                sx={{
                  marginX: "10px",
                  cursor: "pointer",
                  textAlign: "end",
                  "&:hover": { color: "blue" },
                }}>
                Edit
              </Typography>
              <Typography
                variant='subtitle1'
                sx={{
                  marginX: "5px",
                  cursor: "pointer",
                  textAlign: "end",
                  "&:hover": { color: "blue" },
                }}>
                Preview
              </Typography>
            </Box>
            <Paper elevation={5} sx={{ padding: "5vh" }}>
              <form encType='multipart/form-data'>
                <Box mb={3}>
                  <Typography variant='h6'>Choose Your Cover Image</Typography>
                  <TextField
                    name='image'
                    onChange={imageHandler}
                    type={"file"}
                  />
                </Box>
                <Box mb={3}>
                  <TextField
                    label='Enter Post Title'
                    type={"text"}
                    inputProps={{ maxLength: 50 }}
                    sx={{ width: "100%" }}
                    onChange={headingHandler}
                  />
                </Box>
                <ReactQuill
                  style={{ height: "25vh", marginBottom: "50px" }}
                  placeholder='Write here .....'
                  theme='snow'
                  value={value}
                  formats={formats}
                  modules={modules}
                  onChange={setValue}
                />
              </form>
            </Paper>
            <Box sx={{ display: "flex" }} mt={4}>
              <Box>
                <Button variant='contained' onClick={publishHandler}>
                  Publish
                </Button>
              </Box>
              <Box mx={4}>
                <Button variant='outlined'>Draft</Button>
              </Box>
            </Box>
          </Box>
          <Box
          />
        </Grid>
        <Grid item md={2}></Grid>
      </Grid>
    </>
  );
}

export default Editors;
