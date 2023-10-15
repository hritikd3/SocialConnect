import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  user: null,
  token: null,
  posts: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      //here the first state.mode refers to the previous condition line no 4(:light)

      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout:(state)=>{
      state.user= null;
      state.token= null;
    },
    setFriends:(state, action)=>{
      if(state.user){
        state.user.friends= action.payload.friends;
      }else{
        console.log("user friends not exist")
      }
    },
    setPosts:(state, action)=>{
      state.posts= action.payload.posts;
    },
    setPost: (state, action)=>{
 const updatedPosts= state.posts.map((post)=>{
  if(post._id=== action.payload.post_id)
  return action.payload.post.post_id;

  return post;
 })
 state.posts= updatedPosts;
    }
  },
});


export const{ setMode, setLogin, setFriends, setLogout, setPost, setPosts}= authSlice.actions;
export default authSlice.reducer;