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
import { East, West } from "@mui/icons-material";
import FormStepIndicator from "../../components/FormStepIndicator";
import FlexBetween from "../../components/FlexBetween";
import CategoryCard from "../../components/CategoryCard";

import {
  setFormPricing,

} from "../../state/";

import { useAppDispatch, useAppSelector } from "../../state/hooks";


interface eventType {
  category?: String;
  seat?: number;
  price?: number;
}

interface eventsType extends Array<eventType> {}

const FormStep2 = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState("");
  // const [slotHeight, setSlotHeight] = useState(0);
  const [price, setPrice] = useState(0);

  const { pathname } = useLocation();
  const theme = responsiveFontSizes(useTheme());

  const initialCategory: eventsType = [];
  const [events, setEvents] = useState(initialCategory);

  const [categoryInput, setCategoryInput] = useState("");
  const [seatsInput, setSeatsInput] = useState(0);
  const [priceInput, setPriceInput] = useState(0);

  const dispatch = useAppDispatch();
  const formSelected = useAppSelector(state => state.formSlice);

  const onCreateHandler = () => {
    setEvents((prevState) => {
      return [
        ...prevState,
        {
          category: categoryInput,
          seat: seatsInput,
          price: priceInput,
        },
      ];
    });
    // console.log(events);
    dispatch(setFormPricing({
      category: categoryInput,
      price: priceInput,
      quantity: seatsInput
    }));

    setPriceInput(0);
    setSeatsInput(0);
    setCategoryInput("");
  };
  console.log(formSelected.pricing);

  useEffect(() => {
    setActive(pathname);
  }, []);


  return (
    <Box
      sx={{
        display: "flex",
        margin: "0 0 0 10",
        alignItems: "center",
        height: "100vh",
        backgroundColor: theme.palette.background.default,
        borderRadius: "5%",
      }}
    >
      <FormStepIndicator />
      <Box
        sx={{
          margin: "0 100 0 100",
          backgroundColor: theme.palette.background.default,
          width: "60%",
          height: "80vh",
          borderRadius: "5%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            height: "70vh",
            backgroundColor: theme.palette.background.alt,
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
              borderRadius: "5%",
            }}
          >
            <Box
              sx={{ width: "100%", display: "flex", justifyContent: "center" }}
            >
              <Typography variant="h1">Create an event instance</Typography>
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
              gap={3}
            >
              <Box sx={{ width: "8rem", marginRight: "3rem" }}>
                <Typography variant="h3">Price</Typography>
              </Box>
              <FormControl variant="standard" fullWidth>
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
                  startAdornment = {<InputAdornment position = "start">$&nbsp;&nbsp;</InputAdornment>}
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
                Create
              </Button>
            </FlexBetween>
          </Box>

          <Box
            sx={{
              width: "100%",
              position: "relative",
              height: events.length > 0 ? "40vh" : "10vh", //events.length > 0 ? "40vh" : "auto"
              backgroundColor: theme.palette.background.alt,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              overflow: "auto",
              marginLeft : "0rem"
            }}
          >
            <Typography variant="h1" mb={1} sx={{ wordWrap: "break-word" }}>
              Your current events:
            </Typography>
            {events.map((el) => {
              return (
                <CategoryCard
                  price={el.price || 0}
                  seat={el.seat || 0}
                  category={el.category || "Uncharted"}
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
                navigate("/create/formstep1");
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
              Next
              <East />
            </Button>
          </FlexBetween>
        </Box>
      </Box>
    </Box>
  );
};

export default FormStep2;
