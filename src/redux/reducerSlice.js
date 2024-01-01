import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userDetails: [],
}

export const schoolDashBoardSlice = createSlice({
    name:"user",
    initialState,

    reducers: {
        userDataRedux: (state,{payload}) => {
            state.userDetails =payload
            console.log( " state.user ",state.user )
            console.log("stateeee",state)
          // Redux Toolkit allows us to write "mutating" logic in reducers. It
          // doesn't actually mutate the state because it uses the Immer library,
          // which detects changes to a "draft state" and produces a brand new
          // immutable state based off those changes
        //   state.value += 1
        },
        // decrement: (state) => {
        //   state.value -= 1
        // },
        // incrementByAmount: (state, action) => {
        //   state.value += action.payload
        // },
      },

})


// Action creators are generated for each case reducer function
// export const { userDataRedux, decrement, incrementByAmount } = schoolDashBoardSlice.actions

export const { userDataRedux } = schoolDashBoardSlice.actions;
// export const getUserData =(state)=>state.userDetails.user   

export default schoolDashBoardSlice.reducer