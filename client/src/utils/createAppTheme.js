// createAppTheme.js
import { createTheme, responsiveFontSizes } from "@mui/material/styles";

const createAppTheme = (themeSettings) => {
  return responsiveFontSizes(createTheme(themeSettings));
};

export default createAppTheme;
