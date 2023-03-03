import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Button,
  Box,
  useTheme,
  Typography,
  Input,
  InputLabel,
  FormControl,
  FormHelperText,
} from "@mui/material";
import FlexBetween from "../../components/FlexBetween";
import FormStepIndicator from "../../components/FormStepIndicator";
import { East } from "@mui/icons-material";
import { useAppSelector, useAppDispatch } from "../../state/hooks";
import { shallowEqual } from "react-redux";

import {
  setFormDesc,
  setFormTitle,
} from "../../state/";

const CreateEvent = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState("");
  const { pathname } = useLocation();
  const theme = useTheme();

  const dispatch = useAppDispatch();
  const formSelected = useAppSelector((state) => state.formSlice, shallowEqual);

  //If uncommented, it exposes 2 rerenders. This is because there is a change of state in the store. (1) and then useAppSelector detects a
  //state change (2)
  // console.log("The title rerender in index is " + formSelected.title);

  //This actually accounts for 2 of the extra 4 rerenders. Makes sense. First render, and then empty dependency causes state change
  //leading to first diffing. 
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
      }}
    >
      <FormStepIndicator/>
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
            height: "50vh",
            backgroundColor: theme.palette.background.alt,
            mt: 10,
            alignItems: "center",
            justifyContent: "center",
            ml: "10px",
            flexDirection: "column",
            width: "95%",
            paddingLeft: "20px",
            paddingTop: "20px",
            paddingTop: "10px",
            borderRadius: "5%",
          }}
        >
          <Box
            sx={{
              width: "100%",
              position: "relative",
              height: "30vh",
              backgroundColor: theme.palette.background.alt,
              display: "flex",
              flexDirection: "column",
              borderRadius: "5%",
            }}
          >
            <Typography
              variant="h1"
              mb={1}
              sx={{ fontWeight: "bold", wordWrap: "break-word" }}
            >
              It begins with a good title.
            </Typography>
            <FlexBetween sx={{ width: "100%", justifyContent: "center" }}>
              <FormControl variant="standard" fullWidth>
                <InputLabel htmlFor="outline-title">*Required</InputLabel>
                <Input
                  required
                  id="outline-title"
                  placeholder="World Tour"
                  sx={{ width: "80%", height: "4rem" }}
                  onChange = {(event) => {
                    dispatch(setFormTitle(event.target.value));
                    console.log(formSelected.title);

                }}
                value = {formSelected.title}
                />
                <FormHelperText id="outline-title-helper">
                  Your event
                </FormHelperText>
              </FormControl>
            </FlexBetween>
          </Box>
          <Box
            sx={{
              width: "100%",
              position: "relative",
              height: "30vh",
              backgroundColor: theme.palette.background.alt,
            }}
          >
            <Typography
              variant="h1"
              mb={1}
              sx={{ fontWeight: "bold", wordWrap: "break-word" }}
            >
              Description
            </Typography>
            <FlexBetween sx={{ width: "100%", justifyContent: "center" }}>
              <FormControl variant="standard" fullWidth>
                <InputLabel htmlFor="outline-desc">*Required</InputLabel>
                <Input
                  required
                  id="outline-desc"
                  placeholder="Write something catchy"
                  sx={{ width: "80%", height: "4rem" }}
                  onChange = {
                    (event) => {
                      dispatch(setFormDesc(event.target.value));
                      console.log("The description is " + formSelected.description)
                    }
                  }
                  value = {formSelected.description}
                />
                <FormHelperText id="outline-desc-helper">
                  Give a rundown of events
                </FormHelperText>
              </FormControl>
            </FlexBetween>
          </Box>

          <Button
            variant="contained"
            size="large"
            sx={{ marginTop: "2rem" }}
            onClick={() => {
              navigate("/create/formstep1");
              // dispatch(setFormTitle());
            }}
            sx={{
              backgroundColor: theme.palette.secondary[200],
              position: "relative",
              bottom: "10px",
            }}
          >
            Next
            <East />
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default CreateEvent;
