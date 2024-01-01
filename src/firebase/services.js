import { ref, update, remove ,set,onValue,getDatabase} from "firebase/database";
import { database } from "./fire";
// import { database } from "../firebase/fire";







//save user Data 

export const saveDataToDB =async(dataName,id,data)=>{
  try {
    const database= getDatabase()
    await set(ref(database, dataName +"/" +id), {
      ...data
    }).then(()=>{
      console.log("Accont Created SuccessFully")
      // navigator("/login")
    }).catch((error)=>{
      console.log("Not Account Created",error)
    });
    console.log('Document written with ID:');
    console.log("After adding to Firestore");
  } catch (error) {
    
  }
}













// all data 
export const getAllusers = async () => {
  try {
    let newData = [];

    const tasksRef = ref(database, "user");
    onValue(tasksRef, (snapshot) => {
      const tasks = snapshot.val();
      console.log("tasks", tasks);
      if (tasks) {
        for (const key in tasks) {
          const { fullName, PhoneNo, email, password, uid, userName } =
            tasks[key];
          newData.push({
            key: uid,
            fullName: fullName,
            PhoneNo: PhoneNo,
            email: email,
            password: password,
            userName: userName,
          });
        }
      } else {
        newData = [];
      }
      return newData;
    });
    console.log("tasks Last444", newData);
    return newData;
  } catch (error) {
    console.log(error.message);
  }
};

////////////////////////////////////////////

//some issue
// const selectData =()=>{
//   try {
//     const dbref = ref(database);
//     get(child(dbref,"user/"+"pzo0g3FFWrY1vQxzjwGX5mjMHrC3").then((snapshot) => {
//       if(snapshot.exists()){
//       let newData =snapshot.val()
//       const { fullName, PhoneNo, email, password, uid, userName } = newData
//       setData222({
//         key: uid,
//         fullName: fullName,
//         PhoneNo: PhoneNo,
//         email: email,
//         password: password,
//         userName: userName,
//       })
//     }
//     else{
//       console.log("Data Not Found");
//     }
//   }))
//   } catch (error) {
//     console.log(error.message)
//   }

// }

// -------------------------------------Second Way
// Get Selected  id all data
export const selectDataHandler = async (id) => {
  try {
    let selectedData = [];
    const database= getDatabase()
    const tasksRef = ref(database,"user/" + id);
    await onValue(tasksRef, (snapshot) => {
      const tasks = snapshot.val();
      console.log("tasks", tasks);
      if (tasks) {
        selectedData.push(tasks);
      } else {
        selectedData = [];
      }

      console.log("tasks Last", selectedData);

      return selectedData;
    });
  } catch (error) {
    console.log(error.message);
  }
};


//update data
export const HandlerUpdate = () => {
  try {
    update(ref(database, "user/" + "QIxLz6rXf6gld4Buz2AoyZ2EWqh2"), {
      fullName: "LLLLLLLLL",
    })
      .then(() => {
        console.log("Accont Update SuccessFully");
      })
      .catch((error) => {
        console.log(error.message);
      });
  } catch (error) {
    console.log(error);
  }
};

///GET SELECTED DATA FROM DB

export const HandlerDeleted = () => {
  try {
    remove(ref(database, "user/" + "QIxLz6rXf6gld4Buz2AoyZ2EWqh2"))
      .then(() => {
        console.log("Data Delete SuccessFully");
      })
      .catch((error) => {
        console.log(error.message);
      });
  } catch (error) {
    console.log(error);
  }
};
