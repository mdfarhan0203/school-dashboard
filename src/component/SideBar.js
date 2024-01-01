import React from "react";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { auth } from "../firebase/fire";
import { signOut } from "firebase/auth";


import { useNavigate } from "react-router-dom";

const drawerWidth = 240;

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = async() => {
    try {
      await signOut(auth)
      navigate("/");
      console.log("Signed out successfully")
    } catch (error) {
      console.log(error)
      console.log("Logout Error");
    }               
}


  const listItem = [
    // {
    //   text: "user Details",
    //   imgURL:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9JkvPpop6atc8sJSZmc4tb2VUK_JGvKyNpg&usqp=CAU",
    //   onclick: () => navigate("/"),
    // },
    {
      text: "DashBoard",
      onclick: () => navigate("/dashboard"),
    },
    {
      text: "Account",
      onclick: () => navigate("/account"),
    },
    {
      text: "Syllabus",
      onclick: () => navigate("/syllabus"),
    },
    {
      text: "Logout",
      onclick: () => handleLogout(),
    },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List  style={{textAlign:"center"}}>
            <div className="user-profile-details"  style={{textAlign:"center"}}>
              <div className="images">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9JkvPpop6atc8sJSZmc4tb2VUK_JGvKyNpg&usqp=CAU" 
                  style={{borderRadius:"50%" , height:"9rem"}}
                />
              </div>
              <h4>Md Farhan</h4>
            </div>
            {listItem.map((item, index) => {
              const { text, onclick } = item;
              return (
                <ListItem key={text} disablePadding>
                  <ListItemButton onClick={onclick}>
                    {/* <ListItemIcon>
                      {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                    </ListItemIcon> */}
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}></Box>
    </Box>
  );
}
