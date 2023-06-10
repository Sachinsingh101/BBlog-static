import { Box, Paper, Stack, Skeleton } from "@mui/material";
function BlogLoader() {
  return (
    <>
      <Box>
        <Paper elevation={0}>
          <Stack sx={{ marginTop: "-7vh", padding: "10px" }} spacing={0}>
            <Skeleton sx={{ width: "100%" }} height={350} />
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                marginTop: "-9vh",
              }}>
              <Skeleton width={50} height={50} variant='circular' />
              <Skeleton
                sx={{ marginLeft: "10px" }}
                width={200}
                height={60}
                variant='text'
              />
            </Box>
            <Skeleton height={50} variant='text' />
          </Stack>
        </Paper>
      </Box>
    </>
  );
}

export default BlogLoader;
