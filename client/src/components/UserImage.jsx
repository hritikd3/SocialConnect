
import { Avatar } from "@mui/material";
import {styled} from "@mui/system";

const StyledAvatar = styled(Avatar)({
  width: "100%",
  height: "100%",
  borderRadius: "50%",
  border: "2px solid #00D5FA", // Added border
  // borderColor: (theme) => theme.palette.primary.main, // Added blue border color
});

const UserImage = ({ image, size = "50px", onClick }) => {
  return (
    <StyledAvatar
      alt="user"
      src={`http://localhost:3001/assets/${image}`}
      sx={{ width: size, height: size, cursor: onClick ? "pointer" : "default" }}
      onClick={onClick}
    />
  );
};

export default UserImage;
