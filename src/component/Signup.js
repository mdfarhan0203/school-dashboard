import React  from "react";
import { Link,useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { auth,db } from '../firebase/fire';
import {createUserWithEmailAndPassword}  from "firebase/auth"
// import {addDoc,collection} from "firebase/firestore"
import { ref, set } from "firebase/database";
import { getDatabase } from "firebase/database";
import {useDispatch } from 'react-redux'
import {userDataRedux} from "../redux/reducerSlice"
import {selectDataHandler} from "../firebase/services"
// import { useHistory } from 'react-router-dom'; 



const defaultTheme = createTheme();

export default function SignUp() {
  const navigator =  useNavigate()
  const dispatch = useDispatch()



  const storeDataInRadux =async(id)=>{
    try {
      const allUsersDetails = await selectDataHandler(id);
      console.log("All Users Details from Firebase", allUsersDetails);
      dispatch(userDataRedux(allUsersDetails));
    } catch (error) {
      console.log(error.message)
    }
  }



  const handleSubmit = async(event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const usersData = {
      fullName: data.get("fullName"),
      PhoneNo: data.get("PhoneNo"),
      userName: data.get("userName"),
      email: data.get("email"),
      password: data.get("password"),
      timestamp: new Date(),
    };

    console.log("Form Data",usersData);

    //Register
    const registerWithEmailAndPassword = async (data) => {
      const {fullName,PhoneNo,email,userName,password} ={...data}
      try {
        console.log("Before creating user:", email, password);
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        console.log("After creating user:", user);

        // save user Data
        console.log("Before adding to Firestore:", user.uid, fullName, email, PhoneNo, userName, password);
        console.log("user.uid-----",user.uid);
        console.log("user.uid-----",user);

        const database= getDatabase()
       let response = await set(ref(database, "user/" + user.uid), {
          uid: user.uid,
          fullName,
          email,
          PhoneNo,
          userName,
          password,
        })

console.log("response--------",response);

        
        console.log("Account Created Successfully");

        // Get all details and set to Redux
        await storeDataInRadux(user.uid)
   

        // Navigate to the login page using React Router's useHistory
        // const history = useHistory();
        navigator("/login");
        
        // .then(()=>{
        //   console.log("Accont Created SuccessFully")
        //   //get all Details and set to Redux
        //   let allUsersDetails =await selectDataHandler(user.uid);
        //   console.log("allUsersDetails from FireBase",allUsersDetails);
        //   dispatch(userDataRedux())
        //   navigator("/login")
        // }).catch((error)=>{
        //   console.log("Not Account Created",error)
        // });
        // console.log('Document written with ID:');
        // console.log("After adding to Firestore");

      } catch (err) {
        console.error(err);
        alert(err.message);
      }
    };
    registerWithEmailAndPassword(usersData)

    console.log("useData", usersData);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="full-name"
                  name="fullName"
                  required
                  fullWidth
                  id="fullName"
                  label="Full Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="PhoneNo"
                  label="Phone No"
                  name="PhoneNo"
                  autoComplete="phone-no"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="userName"
                  label="User name"
                  name="userName"
                  autoComplete="user-name"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email-name"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="center">
              <Grid item>
                <Link to="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
