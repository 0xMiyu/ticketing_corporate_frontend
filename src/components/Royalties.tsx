import { useState } from "react";
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

import CustomButton from "./utility/CustomButton";
import FlexBetween from "./FlexBetween";
import RoyaltyCard from "./RoyaltyCard";

import { setFormRoyalties } from "../state/";
import { useAppDispatch, useAppSelector } from "../state/hooks";

interface royaltyType {
    walletAddress?: String;
    share?: number;
    name?: String;
  }
  
interface royaltiesType extends Array<royaltyType> {}

const Royalties = () => {
    const dispatch = useAppDispatch();
    const formSelected = useAppSelector(state => state.formSlice);

    const theme = responsiveFontSizes(useTheme());

    const initialRoyalty: royaltiesType = [];
    const [royaltyInstances, setRoyaltyInstances] = useState(initialRoyalty);
  
    const [walletInput, setWalletInput] = useState("");
    const [shareInput, setShareInput] = useState(0);
    const [nameInput, setNameInput] = useState("");
    
    //Function to manage creating events
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

    return(
        <>
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
                  Wallet address of recipient
                </FormHelperText>
              </FormControl>
            </FlexBetween>
            <FlexBetween
              sx={{ justifyContent: "center", marginBottom: "10px" }}
            >
              <CustomButton text = {"Add"} onClick = {onCreateHandler}/>
            </FlexBetween>
            {royaltyInstances.map((el) => {
              return (
                <RoyaltyCard
                  share={el.share || 0}
                  name={el.name || "Tom and Jerry"}
                  walletAddress={el.walletAddress || "Empy Address"}
                />
              );
            })}
        </>
    )
}

export default Royalties;