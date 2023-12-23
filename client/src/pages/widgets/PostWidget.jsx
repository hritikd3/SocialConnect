import { useEffect, useState } from "react";
import { useTheme } from "@mui/material";
import {
  IconButton,
  Divider,
  Typography,
  Box,
  Skeleton,  // Add Skeleton component for loading placeholder
} from "@mui/material";
import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "../../state";
import Friend from "../../components/Friend";
import WidgetWrapper from "../../components/WidgetWrapper";
import FlexBetween from "../../components/FlexBetween";



const PostWidget = ({
  postId,
  postUserId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  comments,
}) => {
  const [isComments, setIsComments] = useState(false);
    const [imageLoading, setImageLoading] = useState(true);  // Add loading state for the image
  const [isShared, setIsShared] = useState(false);

  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;



   useEffect(() => {
    const image = new Image();
    image.src = `http://localhost:3001/assets/${picturePath}`;
    // Simulate a delay before setting imageLoading to false
    const delay = 2000; // Adjust the delay time (in milliseconds) as needed

    // Set loading state after the delay
    const timeoutId = setTimeout(() => {
      setImageLoading(false);
    }, delay);

    // Clear timeout if the component unmounts
    return () => clearTimeout(timeoutId);

    // Listen for the image load event
  }, [picturePath]);

  const patchLike = async () => {
    const response = await fetch(`http://localhost:3001/posts/${postId}/like`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: loggedInUserId }),
    });
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
  };

  const handleShare = async () => {
  try {
    if (navigator.share) {
      // Check if the Web Share API is supported
      await navigator.share({
        title: 'Check out this post on Sociopedia!',
        text: `${name} shared a post: ${description}`,
        url: window.location.href, // Use the current URL or replace it with the post URL
      });
      setIsShared(true); // Set the shared state if sharing is successful
    } else {
      // Fallback for browsers/devices that do not support the Web Share API
      alert('Web Share API not supported. Consider using other sharing options.');
    }
  } catch (error) {
    console.error('Error sharing:', error);
    alert('Error sharing post. Please try again.');
  }
};

  return (
    <WidgetWrapper m="2rem 0">
      <Friend
        friendId={postUserId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
      />
      <Typography color={main} sx={{ mt: "1rem" }}>
        {description}
      </Typography>
      {picturePath && (
         <Skeleton
         variant="caption" color="text.secondary"
        //  animation="wave" 
          width="100%"
          height={imageLoading ? 200 : "auto"}  // Set a placeholder height
          style={{
            borderRadius: "0.75rem",
            marginTop: "0.75rem",
            display: imageLoading ? "block" : "none",
          }}
        />
      )}

       {picturePath && !imageLoading && (
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={`http://localhost:3001/assets/${picturePath}`}
        />
      )}
      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            <IconButton onClick={patchLike}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{likeCount}</Typography>
          </FlexBetween>


          <FlexBetween gap="0.3rem">
            <IconButton onClick={() => setIsComments(!isComments)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{comments.length}</Typography>
          </FlexBetween>
        </FlexBetween>

         <IconButton onClick={handleShare}>
          {isShared ? (
            // You can customize the icon for the shared state
            // <FavoriteOutlined sx={{ color: primary }} />
            <ShareOutlined />

          ) : (
            <ShareOutlined />
          )}
        </IconButton>
      </FlexBetween>


      {isComments && (
        <Box mt="0.5rem" >
      
        
          {comments.map((comment, i) => (
             <Box
              key={`${name}-${i}`}
              sx={{
                position: 'relative',
                margin: '0.5rem 0',
                paddingLeft: '2rem',
                border: `1px solid ${primary}`,
                borderRadius: '0.5rem',
                background: main,
              }}
            >
              <div
                sx={{
                  position: 'absolute',
                  left: '0.5rem',
                  top: '50%',
                  width: '0',
                  height: '0',
                  borderTop: '8px solid transparent',
                  borderBottom: '8px solid transparent',
                  borderRight: `10px solid ${primary}`,
                  transform: 'translateY(-50%)',
                }}
              />
             <Typography sx={{ color: palette.background.alt, m: '0.5rem' }}>
                {comment}
              </Typography>
          
           </Box>
          ))}
          <Divider />
        </Box>
      )}
    </WidgetWrapper>
  );
};

export default PostWidget;