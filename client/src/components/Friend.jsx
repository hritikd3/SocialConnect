import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { setFriends } from "../state";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// Friend component representing a friend entry in the UI
const Friend = ({ friendId, name, subtitle, userPicturePath }) => {
  // Redux hooks for state management
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Select user-related information from the Redux store
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);

  // Extract colors from the theme palette
  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  // Check if the friend is already in the user's friends list
  const isFriend = friends.find((friend) => friend._id === friendId);

  // Function to update the friendship status with a server patch request
  const patchFriend = async () => {
    const response = await fetch(
      `http://localhost:3001/users/${_id}/${friendId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    
    // Dispatch an action to update the friends list in the Redux store
    dispatch(setFriends({ friends: data }));
  };

  // Render the UI for the Friend component
  return (
    <FlexBetween>
      {/* Left side: User information */}
      <FlexBetween gap="1rem">
        <UserImage image={userPicturePath} size="55px" />
        <Box
          // Navigate to the friend's profile when clicking on the user information
          onClick={() => {
            navigate(`/profile/${friendId}`);
            navigate(0);
          }}
        >
          {/* Friend's name */}
          <Typography
            color={main}
            variant="h5"
            fontWeight="500"
            sx={{
              "&:hover": {
                color: palette.primary.light,
                cursor: "pointer",
              },
            }}
          >
            {name}
          </Typography>
          {/* Friend's subtitle (additional information) */}
          <Typography color={medium} fontSize="0.75rem">
            {subtitle}
          </Typography>
        </Box>
      </FlexBetween>

      {/* Right side: Button to add/remove friend */}
      <IconButton
        // Trigger the patchFriend function on button click
        onClick={() => patchFriend()}
        sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
      >
        {/* Display "Add Friend" or "Remove Friend" icon based on friendship status */}
        {isFriend ? (
          <PersonRemoveOutlined sx={{ color: primaryDark }} />
        ) : (
          <PersonAddOutlined sx={{ color: primaryDark }} />
        )}
      </IconButton>
    </FlexBetween>
  );
};

export default Friend;
