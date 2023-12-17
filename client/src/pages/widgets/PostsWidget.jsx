import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import PostWidget from "../widgets/PostWidget";

// Define a functional component called PostsWidget
const PostsWidget = ({ userId, isProfile = false }) => {
  // Get the dispatch function from Redux
  const dispatch = useDispatch();
  
  // Select posts and token from the Redux store state
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);

  // Function to fetch all posts
  const getPosts = async () => {
    const response = await fetch("http://localhost:3001/posts", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    
    // Dispatch the setPosts action with the fetched posts data
    dispatch(setPosts({ posts: data }));
  };

  // Function to fetch posts for a specific user
  const getUserPosts = async () => {
    const response = await fetch(
      `http://localhost:3001/posts/${userId}/posts`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    
    // Dispatch the setPosts action with the fetched user-specific posts data
    dispatch(setPosts({ posts: data }));
  };

  // useEffect hook runs when the component mounts
  useEffect(() => {
    // Check if the component is in profile mode
    if (isProfile) {
      // If in profile mode, fetch user-specific posts
      getUserPosts();
    } else {
      // If not in profile mode, fetch all posts
      getPosts();
    }
  }, []); // Empty dependency array ensures useEffect runs only once

  // Render PostWidget components based on the fetched posts
  return (
    <>
      {posts.map(
        ({
          _id,
          userId,
          firstName,
          lastName,
          description,
          location,
          picturePath,
          userPicturePath,
          likes,
          comments,
        }) => (
          <PostWidget
            key={_id}
            postId={_id}
            postUserId={userId}
            name={`${firstName} ${lastName}`}
            description={description}
            location={location}
            picturePath={picturePath}
            userPicturePath={userPicturePath}
            likes={likes}
            comments={comments}
          />
        )
      )}
    </>
  );
};

export default PostsWidget;
