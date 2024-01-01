import React, { useEffect, useState } from "react";
import "./pages.css";
import SideBar from "../component/SideBar";
import Box from "@mui/material/Box";
import { Divider } from "@mui/material";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { Button, Stack } from "@mui/material";
import RemoveCircleOutlineRoundedIcon from "@mui/icons-material/RemoveCircleOutlineRounded";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

import { saveDataToDB } from "../firebase/services";

const Syllabus = () => {
  // let keyforDB = useId();

  const [syllabusData, setSyllabusData] = useState({
    board: "",
    class: "",
    subject: "",
    syllabus_desc: "",
    academicYear: "",
    topicDesc: "",
    topicAllocateTime: "",
    subTopic: null,
    topic_operation: null,
  });

  const [selectedDate, setSelectedDate] = useState(null);
  const [nextId, setNextId] = useState(2);
  const [textAreas, setTextAreas] = useState([{ id: 1, value: "" }]);
  const [subTopicData, setSubTopicData] = useState([
    {
      id: 1,
      subTopicName: "",
      subTopicDesc: "",
    },
  ]);

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSyllabusData((prev) => ({ ...prev, [name]: value }));
  };

  const addNewTextArea = () => {
    setTextAreas((prevState) => [...prevState, { id: nextId, value: "" }]);
    setNextId((prevId) => prevId + 1);
  };

  // sub Topic Data
  const addNewTextAreaSubTopic = (e) => {
    // const [name,value] = e.target
    setSubTopicData((prevState) => [...prevState, { id: nextId, value: "" }]);
    setNextId((prevId) => prevId + 1);
  };

  // topic_operation
  const handleTextAreaChange = (id, value) => {
    setTextAreas((prevState) =>
      prevState.map((textArea) =>
        textArea.id === id ? { ...textArea, value } : textArea
      )
    );
  };

  const handleSubTopicChange = (e, id) => {
    const { name, value } = e.target;
    setSubTopicData((prevState) =>
      prevState.map((textArea) =>
        textArea.id === id ? { ...textArea, [name]: value } : textArea
      )
    );
  };

  const handleDateChange = (date) => {
    if (date) {
      const { $D, $M, $y } = date;
      let AllotmentDate = `${$M}/${$D}/${$y}`;
      setSelectedDate(AllotmentDate);
    } else {
      console.log("Date cleared");
    }
  };

  const handlerRemove = (id) => {
    // console.log("id clicked-----------------",id);
  };

  function generateRandomKey() {
    const randomString = Math.random().toString(36).slice(2, 8); // Random alphanumeric string
    const randomNumber = Math.floor(Math.random() * 1000000); // Random number between 0 and 999999
    const timestamp = Date.now(); // Current timestamp in milliseconds
    const uniqueKey = `${randomString}${randomNumber}${timestamp}`;
    return uniqueKey;
  }

  // Handler Submit
  const handlerSubmit = () => {
    try {
      syllabusData["subTopic"] = subTopicData;
      syllabusData["topicAllocateTime"] = selectedDate;
      syllabusData["topic_operation"] = textAreas;

      //key to store database
      const keyForDB = generateRandomKey();
      console.log(keyForDB);
      // save data to firebase
      saveDataToDB("syllaus", keyForDB, syllabusData);


      //Make Empty all fields 
      const emptyObject = Object.keys(syllabusData).reduce((acc, key) => {
        acc[key] = ""; // Set each value to an empty string
        return acc;
      }, {});

      setSyllabusData(emptyObject);
      setSelectedDate(null);
      setNextId(2);
      setTextAreas([{ id: 1, value: "" }]);
      setSubTopicData([{ id: 1, subTopicName: "", subTopicDesc: "" }]);
      
    } catch (error) {
      console.log(error.message);
    }

    console.log("end Data =====", syllabusData);
    console.groupEnd("End Group");
  };

  useEffect(() => {
    // console.log("Updated Value", syllabusData);
  }, [syllabusData]);

  return (
    <Box sx={{ display: "flex" }}>
      <SideBar />
      <div className="syllabus-container" style={{ width: "100%" }}>
        <div>
          <h1 className="title">Syllabus</h1>
        </div>
        <div className="container11">
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Board</InputLabel>
                  <Select
                    selected={true}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={syllabusData.board}
                    label="Board"
                    name="board"
                    onChange={(e) => handleChange(e)}
                  >
                    <MenuItem name="board" value="CBSE">
                      CBSE
                    </MenuItem>
                    <MenuItem name="board" value="STATE">
                      State Board
                    </MenuItem>
                    <MenuItem name="board" value="ISCE">
                      ICSE
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">class</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={syllabusData.class}
                    label="class"
                    name="class"
                    onChange={handleChange}
                  >
                    <MenuItem value="First">First</MenuItem>
                    <MenuItem value="Second">Second</MenuItem>
                    <MenuItem value="Third">Third</MenuItem>
                    <MenuItem value="Fourth">Fourth</MenuItem>
                    <MenuItem value="Fifth">Fifth</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                {/* <Item>Subject</Item> */}
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Board</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={syllabusData.subject}
                    label="Subject"
                    name="subject"
                    onChange={handleChange}
                  >
                    <MenuItem value="Math">Math</MenuItem>
                    <MenuItem value="Hindi">Hindi</MenuItem>
                    <MenuItem value="English">English</MenuItem>
                    <MenuItem value="Science">Science</MenuItem>
                    <MenuItem value="Sanskrit">Sanskrit</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={8}>
                {/* <Item>Syllabus Describtion TextField</Item> */}
                <TextField
                  placeholder="Maximum 4 rows"
                  multiline
                  rows={3}
                  variant="outlined"
                  fullWidth
                  color="primary"
                  name="syllabus_desc"
                  onChange={(e) => handleChange(e)}
                  value={syllabusData.syllabus_desc}
                />
              </Grid>
              <Grid item xs={4}>
                {/* <Item>Academic Year</Item> */}
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Academic Year
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={syllabusData.academicYear}
                    label="Academic Year"
                    name="academicYear"
                    onChange={handleChange}
                  >
                    <MenuItem value="2019-20">2019-20</MenuItem>
                    <MenuItem value="2020-21">2020-21</MenuItem>
                    <MenuItem value="2021-22">2021-22</MenuItem>
                    <MenuItem value="2022-23">2022-23</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              {/* Above Dont        Touh     ============================= */}
              <Grid item xs={3}>
                {/* <Item>add Button</Item> */}
                <div
                  className="extra-syllubus"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginTop: "0.5rem",
                  }}
                >
                  {textAreas.map((textArea) => (
                    <div style={{ display: "flex" }}>
                      <div
                        style={{ backgroundColor: "red" }}
                        onClick={handlerRemove(textArea.id)}
                      >
                        <RemoveCircleOutlineRoundedIcon />
                      </div>
                      <Stack
                        key={textArea.id}
                        direction="column"
                        spacing={3}
                        alignItems="center"
                      >
                        <TextField
                          label="Sub Topic Operation"
                          multiline
                          rows={1}
                          variant="outlined"
                          fullWidth
                          value={textArea.value}
                          onChange={(e) =>
                            handleTextAreaChange(textArea.id, e.target.value)
                          }
                        />
                      </Stack>
                    </div>
                  ))}
                  <Button onClick={addNewTextArea}>+</Button>
                </div>
              </Grid>

              {/* second Last */}
              <Grid item xs={9}>
                <Box sx={{ width: "95%" }}>
                  <h3>Topic</h3>
                  <Grid
                    container
                    rowSpacing={1}
                    columnSpacing={{ xs: 2, sm: 1, md: 1 }}
                  >
                    <Grid item xs={5}>
                      <TextField
                        id="Topic Description"
                        label="Topic Description"
                        variant="outlined"
                        fullWidth
                        name="topicDesc"
                        onChange={(e) => handleChange(e)}
                        value={syllabusData.topicDesc}
                      />
                    </Grid>

                    <Grid item xs={5}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={["DatePicker"]}>
                          <DatePicker
                            label="Allotment Date"
                            value={dayjs(selectedDate)}
                            name="selectedDate"
                            onChange={handleDateChange}
                          />
                        </DemoContainer>
                      </LocalizationProvider>
                    </Grid>
                  </Grid>
                </Box>
                <h3>Sub - Topic</h3>
                <Grid item xs={10}>
                  {/* <Item>add Button</Item> */}
                  <div className="extra-syllubus">
                    {/* {console.log("Before Map=========",subTopicData)} */}
                    {subTopicData.map((textArea) => (
                      <Stack
                        key={textArea.id}
                        direction="row"
                        spacing={3}
                        alignItems="center"
                      >
                        <TextField
                          label="Sub Topic"
                          multiline
                          rows={1}
                          variant="outlined"
                          fullWidth
                          name="subTopicName"
                          value={subTopicData.subTopicName}
                          onChange={(e) => handleSubTopicChange(e, textArea.id)}
                        />
                        <TextField
                          label="Sub  Description"
                          multiline
                          rows={1}
                          variant="outlined"
                          fullWidth
                          name="subTopicDesc"
                          value={subTopicData.subTopicDesc}
                          onChange={(e) => handleSubTopicChange(e, textArea.id)}
                        />
                        <div>
                          <RemoveCircleOutlineRoundedIcon
                          // onClick={handlerRemove(textArea.id)}
                          // onDelete={handleDelete}
                          />
                        </div>
                      </Stack>
                    ))}
                    <Button
                      style={{
                        display: "flex",
                        justifyContent: "end",
                        width: "100%",
                      }}
                      onClick={addNewTextAreaSubTopic}
                    >
                      +
                    </Button>
                  </div>
                </Grid>
                <br />
                <Divider />
                <br />
                <Button
                  onClick={handlerSubmit}
                  type="submit"
                  variant="contained"
                >
                  submit
                </Button>
              </Grid>
            </Grid>
          </Box>
        </div>
      </div>
    </Box>
  );
};
export default Syllabus;
