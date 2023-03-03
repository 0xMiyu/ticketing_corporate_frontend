import { DateTimePicker } from "@mui/x-date-pickers";
import { Button, TextField, useTheme } from "@mui/material";
import { Add, Remove, StackedBarChart } from "@mui/icons-material";
import FlexBetween from "./FlexBetween";
import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../state/hooks";

import { setFormSchedules, deleteFormSchedules } from "../state/";

let SlotHeight:any;
interface PropType{
  // onIncrease: (a: any) => void,
  dateData: dateSlotType
}

interface dateSlotType {
  dateFrom?: Date,
  id?: number
}

interface dateSlotsType extends Array<dateSlotType>{}

const ScheduleSlot2 = ({dateData}: PropType) => {
  const [dateValFrom, setDateValFrom] = useState(dateData.dateFrom);
  const [identifier, setIdentifier] = useState(dateData.id);

  const dispatch = useAppDispatch();
  const formSelected = useAppSelector(state => state.formSlice);
  const dateDataList = formSelected.schedules;

  const initialInput: dateSlotsType = [
    {dateFrom: dateValFrom, id: identifier}
  ];
  const [number, setNumber] = useState(initialInput);
  const theme = useTheme();

  useEffect(() => {
    SlotHeight = number.length*60;
  },[number]);
//   console.log(formSelected.schedules);
 
  const addSlotHelper = (event:any) => {
    
    event.preventDefault();
    //the function being passed thru onIncrease prop is addSlotHandler2
    // onIncrease(SlotHeight);
    console.log("+++++++")
    console.log(event)
    dispatch(setFormSchedules({dateFrom: new Date(dateValFrom),  id: dateDataList[dateDataList.length - 1].id + 1}));
  }

  const removeSlotHelper = (event:any) => {
    event.preventDefault();
    console.log(event);
    console.log("The id that was clicked to be removed is " + event.target.id);
    dispatch(deleteFormSchedules(parseInt(event.target.id)));
  }


  return (
    <FlexBetween sx = {{flexDirection: "column"}}>
        <FlexBetween sx = {{width: "100%",justifyContent:"left", position: "relative", marginBottom: "10px"}} gap = {5} key = {identifier.toString()}>
        <DateTimePicker
        label="Date/Time"
        value = {dateValFrom}
        onChange={(newValue) => {
          if (newValue !== null && newValue !== undefined){
            console.log("=============")
            console.log(newValue)
            setDateValFrom(newValue._d);
            console.log(newValue._d)
          }
        }}
        renderInput={(params) => <TextField {...params} />}
      />
        {/* <DateTimePicker
        label="End Date"
        value = {dateValTo}
        onChange={(newValue) => {
          if (newValue !== null && newValue !== undefined){
            setDateValTo(newValue);
          }
        }}
        renderInput={(params) => <TextField {...params} />}
      /> */}
      {identifier == 0 ? 
      <Button 
          variant = "contained"
          sx = {{
          width:"40px", 
          height:"40px",
          backgroundColor:theme.palette.secondary[200],
        }}
        onClick = {addSlotHelper}
        id = {identifier.toString()}
        >
      <Add/>
    </Button> 
    : 
    <Button
    variant = "contained"
    sx = {{
    width:"40px", 
    height:"40px",
    backgroundColor:theme.palette.secondary[200]
  }}
    onClick = {removeSlotHelper}
    id = {identifier.toString()}
    >
      <Remove/>
    </Button>
    }
      </FlexBetween>
    </FlexBetween>
  )
}

export default ScheduleSlot2;

export {SlotHeight};