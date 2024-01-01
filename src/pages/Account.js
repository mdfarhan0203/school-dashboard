import React, { useEffect } from "react";
import SideBar from "../component/SideBar";
import Box from "@mui/material/Box";
import { Divider, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});
const Account = () => {
  //get User Details

  useEffect(() => {
    console.log("initial get all the user details");
  }, []);

  return (
    <Box sx={{ display: "flex", width: "100%" }}>
      <SideBar />

      <Box
        sx={{
          p: 2,
          // margin: 'auto',
          maxWidth: 700,
          flexGrow: 1,
          backgroundColor: (theme) =>
            theme.palette.mode === "dark" ? "#1A2027" : "#fff",
        }}
      >
        <h2>Account</h2>
        <Divider />
        <br />
        <Grid container spacing={2}>
          <Grid item>
            <ButtonBase sx={{ width: 300, height: 350 }}>
              <Img
                alt="complex"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9JkvPpop6atc8sJSZmc4tb2VUK_JGvKyNpg&usqp=CAU"
                style={{ borderRadius: "50%" }}
              />
            </ButtonBase>

            {/* <Button
              component="label"
              variant="contained"
              startIcon={<CloudUploadIcon />}
            >
              Upload file
              <VisuallyHiddenInput type="file" />
            </Button> */}
          </Grid>
          <Grid item xs={12} sm container mt={10}>
            <Grid item xs container direction="column" spacing={4}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1" component="div">
                  <h3>Name</h3>
                </Typography>
                <Typography variant="body2" gutterBottom>
                  <h3> Email</h3>
                </Typography>
              </Grid>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1" component="div">
                <h3>Phone Number</h3>
              </Typography>
              <Typography variant="subtitle1" component="div">
                <h3>user Name</h3>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button variant="contained" size="large">
            Edit
          </Button>
        </div>
      </Box>

     
    </Box>
  );
};

export default Account;
