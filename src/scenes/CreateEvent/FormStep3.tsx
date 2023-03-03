import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Button,
  Box,
  Input,
  InputLabel,
  FormControl,
  FormHelperText,
  Typography,
  useTheme,
  TextField,
  responsiveFontSizes,
  InputAdornment
} from "@mui/material";
import { West } from "@mui/icons-material";
import FormStepIndicator from "../../components/FormStepIndicator";
import FlexBetween from "../../components/FlexBetween";
import RoyaltyCard from "../../components/RoyaltyCard";

import { setFormRoyalties } from "../../state/";
import { useAppDispatch, useAppSelector } from "../../state/hooks";

interface royaltyType {
  walletAddress?: String;
  share?: number;
  name?: String;
}

interface royaltiesType extends Array<royaltyType> {}

const FormStep3 = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState("");
  // const [price, setPrice] = useState(0);

  const { pathname } = useLocation();
  const theme = responsiveFontSizes(useTheme());

  const initialRoyalty: royaltiesType = [];
  const [royaltyInstances, setRoyaltyInstances] = useState(initialRoyalty);

  const [walletInput, setWalletInput] = useState("");
  const [shareInput, setShareInput] = useState(0);
  const [nameInput, setNameInput] = useState("");
  
  const dispatch = useAppDispatch();
  const formSelected = useAppSelector(state => state.formSlice);

  const onCreateHandler = () => {
    setRoyaltyInstances((prevState) => {
      return [
        ...prevState,
        {
          walletAddress: walletInput,
          share: shareInput,
          name: nameInput,
        },
      ];
    });
    // console.log(royaltyInstances);
    dispatch(setFormRoyalties({
      name: nameInput,
      share: shareInput,
      address: walletInput
    }));
    setShareInput(0);
    setWalletInput("");
    setNameInput("");
  };

  useEffect(() => {
    setActive(pathname);
  }, []);

  // const styledHeight = slotHeight/50 < 3 ? 'calc(30vh' + '+' + slotHeight.toString() + 'px)' : "30vh";
  // const styledOverflow = slotHeight/50 < 3 ? "hidden" : "auto";

  return (
    <Box
      sx={{
        display: "flex",
        margin: "0 0 0 10",
        alignItems: "center",
        height: "100vh",
        backgroundColor: theme.palette.background.default,
      }}
    >
      <FormStepIndicator />
      <Box
        sx={{
          margin: "0 100 0 100",
          backgroundColor: theme.palette.background.default,
          width: "60%",
          height: "80vh",
        }}
      >
        <Box
          sx={{
            display: "flex",
            height: "70vh",
            backgroundColor:theme.palette.background.alt,
            mt: 10,
            alignItems: "center",
            justifyContent: "center",
            ml: "10px",
            flexDirection: "column",
            width: "90%",
            paddingBottom: "20px",
            borderRadius: "5%",
          }}
        >
          <Box
            sx={{
              width: "100%",
              position: "relative",
              height: "auto",
              backgroundColor: theme.palette.background.alt,
              display: "flex",
              flexDirection: "column",
              paddingTop: "1rem",
              "&::-webkit-scrollbar": {
                width: "0.1em",
              },  '&::-webkit-scrollbar-track': {
                boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
                webkitBoxShadow: 'inset 0 0 6px rgba(255,0,0,0.00)'
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: 'rgba(255,0,0,.1)',
                outline: '1px solid red'
              }
            }}
          >
            <Box
              sx={{ width: "100%", display: "flex", justifyContent: "center" }}
            >
              <Typography variant="h1">Configure your royalties</Typography>
            </Box>

            <FlexBetween
              sx={{
                width: "100%",
                justifyContent: "start",
                paddingLeft: "20px",
              }}
              gap={3}
            >
              <Box sx={{ width: "8rem", marginRight: "3rem" }}>
                <Typography variant="h3">Name</Typography>
              </Box>
              <FormControl variant="standard" fullWidth>
                <InputLabel htmlFor="outline-name">*Required</InputLabel>
                <Input
                  required
                  id="outline-name"
                  placeholder="Tom and Jerry"
                  sx={{ width: "80%", height: "4rem" }}
                  onChange={(event) => {
                    setNameInput(event.target.value);
                  }}
                  value={nameInput}
                />
                <FormHelperText id="outline-location-helper">
                  Name of the wallet owner
                </FormHelperText>
              </FormControl>
            </FlexBetween>
            <FlexBetween
              sx={{
                width: "100%",
                justifyContent: "start",
                paddingLeft: "20px",
              }}
              gap={3}
            >
              <Box sx={{ width: "8rem", marginRight: "1rem" }}>
                <Typography variant="h3">Royalty share</Typography>
              </Box>
              <TextField
                type="number"
                id="outlined-basic"
                variant="outlined"
                onChange={(event) => {
                  setShareInput(parseInt(event.target.value)*1000);
                }}
                value={shareInput/1000}
                InputProps = {{
                  endAdornment : <InputAdornment position = "end">%</InputAdornment>
                }}
              />
            </FlexBetween>
            <FlexBetween
              sx={{
                width: "100%",
                justifyContent: "start",
                paddingLeft: "20px",
              }}
              gap={3}
            >
              <Box sx={{ width: "8rem", marginRight: "3rem" }}>
                <Typography variant="h3">Wallet Address</Typography>
              </Box>
              <FormControl variant="standard" fullWidth>
                <InputLabel htmlFor="outline-price">*Required</InputLabel>
                <Input
                  required
                  id="outline-price"
                  placeholder="The address to send royalties to."
                  sx={{ width: "80%", height: "4rem" }}
                  onChange={(event) => {
                    setWalletInput(event.target.value);
                  }}
                  value={walletInput}
                />
                <FormHelperText id="outline-price-helper">
                  Price per ticket
                </FormHelperText>
              </FormControl>
            </FlexBetween>
            <FlexBetween
              sx={{ justifyContent: "center", marginBottom: "10px" }}
            >
              <Button
                size="large"
                variant="contained"
                sx={{ backgroundColor: theme.palette.secondary[200] }}
                onClick={onCreateHandler}
              >
                Add
              </Button>
            </FlexBetween>
          </Box>

          <Box
            sx={{
              width: "100%",
              position: "relative",
              height: royaltyInstances.length > 0 ? "40vh" : "10vh", //events.length > 0 ? "40vh" : "auto"
              backgroundColor: theme.palette.background.alt,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              overflow: "auto",
              marginLeft : "0rem",
            }}
          >
            <Typography variant="h1" mb={1} sx={{ wordWrap: "break-word" }}>
              Your current events:
            </Typography>
            {royaltyInstances.map((el) => {
              return (
                <RoyaltyCard
                  share={el.share || 0}
                  name={el.name || "Tom and Jerry"}
                  walletAddress={el.walletAddress || "Empy Address"}
                />
              );
            })}
          </Box>

          <FlexBetween gap="2rem">
            <Button
              variant="contained"
              size="large"
              sx={{ marginTop: "2rem" }}
              onClick={() => {
                navigate("/create/formstep2");
              }}
              sx={{
                backgroundColor: theme.palette.secondary[200],
              }}
            >
              <West />
              Prev
            </Button>
            <Button
              variant="contained"
              size="large"
              sx={{ marginTop: "2rem" }}
              onClick={() => {
                navigate("/create/formstep3");
              }}
              sx={{
                backgroundColor: theme.palette.secondary[200],
              }}
            >
              Submit
            </Button>
          </FlexBetween>
        </Box>
      </Box>
    </Box>
  );
};

export default FormStep3;
