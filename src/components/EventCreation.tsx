import { useState } from "react";
import {
  Typography,
  Box,
  TextField,
  FormControl,
  InputLabel,
  Input,
  InputBase,
  FormHelperText,
  InputAdornment,
  Button,
  useTheme
} from "@mui/material";

import CustomButton from "./utility/CustomButton";
import FlexBetween from "./FlexBetween";
import CategoryCardParent from "./CategoryCardParent";

import { setFormPricing, setFormTitle } from "../state";
import { useAppDispatch, useAppSelector } from "../state/hooks";

interface eventType {
    category?: String;
    seat?: number;
    price?: number;
}

interface eventsType extends Array<eventType>{};


const EventCreation = () => {
  const dispatch = useAppDispatch();
  const formSelector = useAppSelector((state) => state.formSlice);

  const theme = useTheme();

  //The states of the various input for the category
  const initialCategory: eventsType = [];
  const [categoryInput, setCategoryInput] = useState("");
  const [seatsInput, setSeatsInput] = useState(0);
  const [priceInput, setPriceInput] = useState(0);
  const [events, setEvents] = useState(initialCategory);
  const [file, setFile] = useState("");

  const onCreateHandler = () => {
    //follows the structure defined in state/index.ts and the discord model
    dispatch(setFormPricing({
        category: categoryInput,
        price: priceInput,
        quantity: seatsInput,
        uri: file
    }));
    setCategoryInput("");
    setPriceInput(0);
    setSeatsInput(0);
  };

  const fileChangeHandler = (event:any) => {
    event.preventDefault();
    console.log(event.target.files);
    setFile(URL.createObjectURL(event.target.files[0]));
  }

  return (
    <>
      <FlexBetween
        sx={{
          width: "100%",
          justifyContent: "start",
          paddingLeft: "20px",
          marginBottom: "10px"
        }}
        gap={3}
      >
        <Box sx={{ width: "8rem", marginRight: "3rem" }}>
          <Typography variant="h3">Category Type</Typography>
        </Box>
        <FormControl variant="standard" fullWidth>
          <InputLabel htmlFor="outline-category">*Required</InputLabel>
          <Input
            required
            id="outline-category"
            placeholder="Category A"
            sx={{ width: "80%", height: "4rem" }}
            onChange={(event) => {
              setCategoryInput(event.target.value);
            }}
            value={categoryInput}
          />
          <FormHelperText id="outline-category-helper">
            Category (A, B, C) etc.
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
          <Typography variant="h3">Seats</Typography>
        </Box>
        <TextField
          type="number"
          id="outlined-basic"
          variant="outlined"
          onChange={(event) => {
            setSeatsInput(parseInt(event.target.value));
          }}
          value={seatsInput}
        />
      </FlexBetween>
      <FlexBetween
        sx={{
          width: "100%",
          justifyContent: "start",
          paddingLeft: "20px",
        }}
        gap={4}
      >
        <Box sx={{ width: "8rem", marginRight: "1rem" }}>
          <Typography variant="h3">Price</Typography>
        </Box>
        <FormControl variant="standard">
          <InputLabel htmlFor="outline-price">*Required</InputLabel>
          <Input
            required
            id="outline-price"
            placeholder="Your standard pricing scheme"
            sx={{ width: "80%", height: "4rem" }}
            onChange={(event) => {
              setPriceInput(parseInt(event.target.value));
            }}
            value={priceInput}
            startAdornment={
              <InputAdornment position="start">$&nbsp;&nbsp;</InputAdornment>
            }
          />
          <FormHelperText id="outline-price-helper">
            Price per ticket
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
        <Box sx={{ width: "8rem", marginRight: "2rem" }}>
          <Typography variant="h3">Upload image</Typography>
        </Box>
        <FormControl variant="filled" >
          <InputBase
            required
            sx={{ width: "80%", height: "7rem" }}
            onChange={(event) => {
              fileChangeHandler(event);
            }}
            type = "file"
          />
        </FormControl>
      </FlexBetween>
      <FlexBetween
        sx={{
          width: "100%",
          justifyContent: "start",
          paddingLeft: "20px",
        }}
        gap={3}>
        <Box sx={{ width: "8rem", marginRight: "2rem" }}>
          <Typography variant="h3">Image Preview</Typography>
        </Box>

          {file ? <Box><img src = {file} style = {{width: "20vh", height: "20vh"}}/></Box> : <></>}
      </FlexBetween>
      <FlexBetween sx={{ justifyContent: "center", marginBottom: "10px" }}>
        <CustomButton text = {"Create"} onClick = {onCreateHandler}/>
      </FlexBetween>
      <CategoryCardParent/>
    </>
  );
};

export default EventCreation;
