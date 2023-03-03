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
} from "@mui/material";
import { East, West, Add } from "@mui/icons-material";
import FormStepIndicator from "../../components/FormStepIndicator";
import FlexBetween from "../../components/FlexBetween";

import ScheduleSlot from "../../components/ScheduleSlot";
import ScheduleSlot2 from "../../components/ScheduleSlot2";
import { useAppSelector, useAppDispatch } from "../../state/hooks";

import { setFormLocation, setFormSchedules } from "../../state/";

interface dateSlotType{
  dateFrom: Date,
  dateTo: Date,
  id: number
}

interface dateSlotArr extends Array<dateSlotType>{}

const initDateData:dateSlotType = {
  dateFrom: new Date(),
  dateTo: new Date(),
  id: 0
}



// const dateDataList = [initDateData];

const FormStep1 = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState("");
  const { pathname } = useLocation();
  const theme = useTheme();

  // const [slotHeight, setSlotHeight] = useState(0);

  // const [scheduleCount, setScheduleCount] = useState(1);

  // const [dateDataList, setDateDataList] = useState<dateSlotArr>([initDateData]);


  useEffect(() => {
    setActive(pathname);
  }, []);

  const dispatch = useAppDispatch();
  const formSelected = useAppSelector((state) => state.formSlice);

  // const addSlotHandler = (ParaHeight: any): void => {
  //   setSlotHeight(ParaHeight);
  // };

  // const addSlotHandler2 = ():void => {
  //   setDateDataList(prevState => {
  //     dispatch(setFormSchedules({dateFrom: new Date(), dateTo: new Date(), id: prevState[prevState.length - 1].id + 1}));
  //     return [...prevState, {dateFrom: new Date(), dateTo: new Date(), id: prevState[prevState.length - 1].id + 1}]
  //   });
  //   // dispatch(setFormSchedules({dateFrom: new Date(), dateTo: new Date(), id: prev}))
  //   // console.log(dateDataList);
  // }
  
  const dateDataList2 = formSelected.schedules;

  // const styledHeight =
  //   slotHeight / 50 < 3
  //     ? "calc(30vh" + "+" + slotHeight.toString() + "px)"
  //     : "30vh";
  // const styledOverflow = slotHeight / 50 < 3 ? "hidden" : "auto";


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
          transition: "height 1s linear",
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
            width: "90%",
            paddingBottom: "20px",
            transition: "height 1s linear",
            overflow: "auto",
            paddingLeft: "20px",
            paddingTop: "20px",
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
       
            }}
          >
            <Typography
              variant="h1"
              mb={1}
              sx={{ wordWrap: "break-word" }}
            >
              Where are you holding your big event?
            </Typography>
            <FlexBetween sx={{ width: "100%", justifyContent: "center" }}>
              <FormControl variant="standard" fullWidth>
                <InputLabel htmlFor="outline-location">*Required</InputLabel>
                <Input
                  required
                  id="outline-location"
                  placeholder="National Stadium"
                  sx={{ width: "80%", height: "4rem" }}
                  onChange = {(event) => {
                    dispatch(setFormLocation(event.target.value));
                  }}
                  value = {formSelected.location}
                />
                <FormHelperText id="outline-location-helper">
                  Location
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
              overflow: "auto",
            }}
          >
            <Typography
              variant="h1"
              mb={1}
              sx={{ wordWrap: "break-word" }}
            >
              List your schedules.
            </Typography>

            {/* <ScheduleSlot onIncrease={addSlotHandler} /> */}
            {dateDataList2.map(el => {
              console.log("The id is " + el.id);
              return (
                <ScheduleSlot2 dateData = {el} key = {el.id}/>
              )
            })}
            

          </Box>

          <FlexBetween gap="2rem">
            <Button
              variant="contained"
              size="large"
              sx={{ marginTop: "2rem" }}
              onClick={() => {
                navigate("/create/");
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
                navigate("/create/formstep2");
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

export default FormStep1;
