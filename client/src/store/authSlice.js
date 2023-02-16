import {createSlice} from '@reduxjs/toolkit'

const authSlice = createSlice({
    name: 'auth',
    initialState: [],
    reducers: {
     setUser:(state,action)=>{
    return action.payload
     },
     getUser:(state,action)=>{
        return action.payload
         }
    },
  })
  
  // Extract the action creators object and the reducer
  
  // Extract and export each action creator by name
  export const { setUser,getUser} = authSlice.actions
  // Export the reducer, either as a default or named export
  export default authSlice.reducer