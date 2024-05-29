//material imports
import { Box } from "@mui/material";

//assets
import EmptyFile from "../../assets/EmptyFile.svg";

const NoDataComponent = ({ containerSx = {} }: { containerSx?: object }) => {
  return (
    <Box textAlign="center" sx={{ margin: "200px auto", ...containerSx }}>
      <img src={EmptyFile} alt="empty_image" draggable={false} />
    </Box>
  );
};
export default NoDataComponent;
