import FlexBetween from "../../components/FlexBetween";
import WidgetWrapper from "../../components/WidgetWrapper";
import { Typography, useTheme } from "@mui/material";

const Advertise =()=>{
   const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  return (
    <WidgetWrapper>
      <FlexBetween>
        <Typography color={dark} variant="h5" fontWeight="500">
          Sponsored
        </Typography>
        <Typography color={medium}>Create Ad</Typography>
      </FlexBetween>
      <img
        width="80%"
        height="60%"
        
        alt="advert"
        src="https://teamwolfmedia.netlify.app/images/Website%20designer-amico.svg"
        style={{ borderRadius: "0.75rem", margin: "1.75rem 0" }}
      />
      <FlexBetween>
        <Typography color={main}>Team Wolf Media</Typography>
        <a target="_blank" href="https://teamwolfmedia.netlify.app" rel="noreferrer" >
          <Typography color={medium}>teamwolfmedia.app</Typography>
          </a>
      </FlexBetween>
      <Typography color={medium} m="0.5rem 0">
        Your pathway to stunning and immaculate web design to grow your business with us @ Team Wolf Media
      </Typography>
    </WidgetWrapper>
  );
};

export default Advertise;