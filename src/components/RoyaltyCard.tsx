import {
  Box,
  useTheme,
  Typography,
  Button,
  responsiveFontSizes,
} from "@mui/material";
import { Remove } from "@mui/icons-material";
import FlexBetween from "./FlexBetween";

interface PropType {
  walletAddress?: String;
  share?: number;
  name?: String;
}

const RoyaltyCard = ({ walletAddress, share, name }: PropType) => {
  const theme = responsiveFontSizes(useTheme());

  return (
    <FlexBetween sx={{ width: "90%" }}>
      <Box
        sx={{
          width: "90%",
          backgroundColor: theme.palette.background.default,
          height: "auto",
          padding: "20px 20px 20px 20px",
          borderRadius: "2%",
          marginBottom: "2rem",
          // width: "min-content"
        }}
      >
        <FlexBetween>
          <Box
            sx={{
              "&::-webkit-scrollbar": {
                width: "0.1em",
              },  '&::-webkit-scrollbar-track': {
                boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
                webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: 'rgba(0,0,0,.1)',
                outline: '1px solid slategrey'
              }
            }}
          >
            <Typography variant="h2" sx={{ fontWeight: "bold" }}>
              {name || "Tom and Jerry"}
            </Typography>
            <Typography>{share || 0}</Typography>
            <Typography>
              Wallet Address: {walletAddress || "Wallet address unknown"}
            </Typography>
          </Box>

          <Button
            variant="contained"
            sx={{ backgroundColor: theme.palette.secondary[200] }}
          >
            <Remove sx={{ color: theme.palette.primary[100] }} />
          </Button>
        </FlexBetween>
      </Box>
    </FlexBetween>
  );
};

export default RoyaltyCard;
