import React from "react";
import SideBar from "../component/SideBar";
import Box from "@mui/material/Box";
import { auth } from "../firebase/fire";
import { signOut } from "firebase/auth";

const  Logout = () => {

  const logout = () => {
    signOut(auth);
  };
  return (
    <Box sx={{ display: "flex" }}>
      <SideBar />
      <h1>Logout</h1>

    </Box>
  );
};

export default Logout;
