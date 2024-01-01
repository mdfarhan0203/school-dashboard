import React, { useEffect, useState } from "react";
import SideBar from "../component/SideBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
// import {getAllusers} from "../firebase/services"

// import node from "../data"
import { CompactTable } from "@table-library/react-table-library/compact";
import { useTheme } from "@table-library/react-table-library/theme";
import {
  DEFAULT_OPTIONS,
  getTheme,
} from "@table-library/react-table-library/material-ui";
import { Stack, TextField } from "@mui/material";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

import UserDetails from "../component/UserDetails";
const key = "Search";

// const nodes = [
//   {
//     id: "0",
//     name: "farhan",
//     deadline: new Date(2020, 1, 15),
//     type: "School Name",
//     isComplete: true,
//     nodes: 5,
//   },
//   {
//     id: "1",
//     name: "sohel",
//     deadline: new Date(2020, 1, 15),
//     type: "Board",
//     isComplete: true,
//     nodes: 3,
//   },
//   {
//     id: "2",
//     name: "me",
//     deadline: new Date(2020, 1, 15),
//     type: "Medium",
//     isComplete: true,
//     nodes: 3,
//   },
//   {
//     id: "3",
//     name: "class",
//     deadline: new Date(2020, 1, 15),
//     type: "Class",
//     isComplete: true,
//     nodes: 3,
//   },
//   {
//     id: "4",
//     name: "Edit",
//     deadline: new Date(2020, 1, 15),
//     type: "Action",
//     isComplete: false,
//     nodes: 3,
//   },
// ];

// const handlerAdd = ()=>{
// 	console.log("clicked")
// }

const nodes = [];

const Dashboard = () => {
  const [nextId, setNextId] = useState(2);
  const [subTopicData, setSubTopicData] = useState([
    {
      id: 1,
      subTopicName: "",
      subTopicDesc: "",
    },
  ]);
  const [isEditing, setIsEditing] = useState(true);
  const [search, setSearch] = useState("");
  const [drawId,setDrawerId] =useState('')

  let data = { nodes };

  // sub Topic Data
  const addNewTextAreaSubTopic = (e) => {
    // const [name,value] = e.target
    setSubTopicData((prevState) => [...prevState, { id: nextId, value: "" }]);
    setNextId((prevId) => prevId + 1);
	setIsEditing(true)
  };

  const handleSubTopicChange = (e, id) => {
	// setIsEditing(true)
    const { name, value } = e.target;
    setSubTopicData((prevState) =>
      prevState.map((textArea) =>
        textArea.id === id ? { ...textArea, [name]: value } : textArea
      )
    );
  };

  const materialTheme = getTheme(DEFAULT_OPTIONS);
  const theme = useTheme(materialTheme);

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  ///Add all the method below if you want that column should be fetch
  data = {
    nodes: data.nodes.filter((item) => {
      return (
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.type.toLowerCase().includes(search.toLowerCase())
      );
    }),
  };



  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    // Perform any save operation with the textValue
    console.log('Saved:', subTopicData);
  };


  const COLUMNS = [
    { label: "School Name", renderCell: (item) => item.name },
    {
      label: "Board",
      renderCell: (item) =>
        item.deadline.toLocaleDateString("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        }),
    },
    { label: "Medium", renderCell: (item) => item.type },
    {
      label: "Class",
      renderCell: (item) => item.type,
    },
    {
      label: "Action",
      renderCell: (item) => (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span>{item.nodes?.length}</span>
          <IconButton onClick={() => setDrawerId(item.id)}>
            <EditIcon size={14} />
          </IconButton>
        </div>
      ),
    },
  ];

  console.log("subTopicData", subTopicData);
  return (
    <Box sx={{ display: "flex" }}>
      <SideBar />
      <div className="dashboard-container" style={{width:"65%"}}>
        <div className="title">
          <h2>Dashboard</h2>
        </div>
        {/* display */}
        <div
          className="button-section"
          style={{ display: "flex", justifyContent: "end" }}
        >
          <Button variant="contained" onClick={addNewTextAreaSubTopic}>
            Add
          </Button>
          <Button variant="contained">Deleted</Button>
        </div>
        <div className="table-section">
          <Box sx={{ marginTop: "1rem" }}>
            <Stack spacing={10}>
              {/* icon={<FaSearch />} */}
              <TextField
                label="Search"
                value={search}
                onChange={handleSearch}
              />
            </Stack>

            <CompactTable columns={COLUMNS} data={data} theme={theme} />
            {isEditing ? (
              subTopicData.map((textArea) => (
                <Stack
                  key={textArea.id}
                  direction="row"
                  spacing={1}
                  alignItems="center"
                >
                  <TextField
				  size="small"
                    label="Sub Topic"
					// rows={1}
					// multiline={true}
					
                    //   multiline
                    //   rows={1}
                    variant="outlined"
                    //   fullWidth
                    name="subTopicName"
                    value={subTopicData.subTopicName}
                    onChange={(e) => handleSubTopicChange(e, textArea.id)}
                  />
				                    <TextField
				  size="small"
                    label="Sub Topic"
					// rows={1}
					// multiline={true}
					
                    //   multiline
                    //   rows={1}
                    variant="outlined"
                    //   fullWidth
                    name="subTopicName"
                    value={subTopicData.subTopicName}
                    onChange={(e) => handleSubTopicChange(e, textArea.id)}
                  />
				                    <TextField
				  size="small"
                    label="Sub Topic"
					// rows={1}
					// multiline={true}
					
                    //   multiline
                    //   rows={1}
                    variant="outlined"
                    //   fullWidth
                    name="subTopicName"
                    value={subTopicData.subTopicName}
                    onChange={(e) => handleSubTopicChange(e, textArea.id)}
                  />
				  
                  <TextField
				  size="small"
                    label="Sub  Description"
                    //   multiline
                    //   rows={1}
                    variant="outlined"
                    //   fullWidth
                    name="subTopicDesc"
                    value={subTopicData.subTopicDesc}
                    onChange={(e) => handleSubTopicChange(e, textArea.id)}
                  />
				<Button onClick={handleEditClick}>Edit</Button>
				<Button onClick={handleSaveClick}>Save</Button>

                </Stack>
              ))
            ) : (
				subTopicData.map((textArea) => (
				<Stack
					key={textArea.id}
					direction="row"
					spacing={3}
					alignItems="center"
                >
				
					<h3>{textArea.subTopicDesc}</h3>
					<h3>{textArea.subTopicName}</h3>
				</Stack>
			  ))
			)
			
            
			
		}



		{!isEditing && (
        <div>
		<Button onClick={handleEditClick}>Edit</Button>

          {/* <Button onClick={handleSaveClick}>Save</Button> */}
          {/* <Button onClick={handleCancelClick}>Cancel</Button> */}
        </div>
      )}
            <br />


          </Box>
        </div>
      </div>
    </Box>
  );
};

export default Dashboard;
