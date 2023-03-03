import { DateTimePicker } from "@mui/x-date-pickers";
import { Button, TextField, useTheme } from "@mui/material";
import { Add, Remove, StackedBarChart } from "@mui/icons-material";
import FlexBetween from "./FlexBetween";
import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../state/hooks";

import { setFormSchedules } from "../state/";

let SlotHeight:any;
interface PropType{
  onIncrease: (a: any) => void;
}

interface dateSlotType {
  dateFrom?: Date,
  dateTo?: Date,
  id?: number
}

interface dateSlotsType extends Array<dateSlotType>{}

const ScheduleSlot = ({onIncrease}: PropType) => {
  const [dateValFrom, setDateValFrom] = useState<Date >(new Date());
  const [dateValTo, setDateValTo] = useState<Date >(new Date());
  const [identifier, setIdentifier] = useState(1);

  const dispatch = useAppDispatch();
  const formSelected = useAppSelector(state => state.formSlice);
  
  const initialInput: dateSlotsType = [
    {dateFrom: dateValFrom, dateTo: dateValTo, id: identifier}
  ];
  const [number, setNumber] = useState(initialInput);
  const theme = useTheme();

  useEffect(() => {
    SlotHeight = number.length*60;
  },[number]);
  console.log(formSelected.schedules);
 
  const addSlotHelper = (event:any) => {
    event.preventDefault();
    setIdentifier(prev => prev + 1);
    setNumber((prevState) => {
      // let objectIds = prevState.map(el => el.id);
      // const maxId = Math.max(...objectIds);

      return [
        ...prevState,
        {
        dateFrom: dateValFrom,
        dateTo: dateValTo,
        id: identifier + 1
    }
      ]
    });
    onIncrease(SlotHeight);
    dispatch(setFormSchedules({
      dateFrom: dateValFrom,
      dateTo: dateValTo,
      identifier: identifier + 1
    }))


  }

  const removeSlotHelper = (event:any) => {
    event.preventDefault();
    console.log(event);
    setNumber((prevState) => {
    return [
      ...prevState
    ].slice(0, prevState.length - 1)
    });
    //.filter(el => el.target.id !==)
    onIncrease(SlotHeight);
    setIdentifier(prev => prev - 1);
  }


  return (
    <FlexBetween sx = {{flexDirection: "column"}}>

    {formSelected.schedules.map((el, idx) => {
      console.log(el.identifier)
      return (
        <FlexBetween sx = {{width: "100%",justifyContent:"center", position: "relative", marginBottom: "10px"}} gap = {5} key = {el.identifier.toString()}>
        <DateTimePicker
        label="Start Date"
        value = {el.dateFrom}
        onChange={(newValue) => {
          if (newValue !== null && newValue !== undefined){
            setDateValFrom(newValue);
          }
        }}
        renderInput={(params) => <TextField {...params} />}
      />
        <DateTimePicker
        label="End Date"
        value = {el.dateTo}
        onChange={(newValue) => {
          if (newValue !== null && newValue !== undefined){
            setDateValTo(newValue);
          }
        }}
        renderInput={(params) => <TextField {...params} />}
      />
      {idx == 0 ? 
      <Button 
          variant = "contained"
          sx = {{
          borderRadius:"50%", 
          width:"40px", 
          height:"40px",
          backgroundColor:theme.palette.secondary[200],
        }}
        id = {el.identifier.toString()}
        >
      <Add onClick = {addSlotHelper} id = {el.identifier.toString()}/>
    </Button> 
    : 
    <Button
    variant = "contained"
    sx = {{
    borderRadius:"50%", 
    width:"40px", 
    height:"40px",
    backgroundColor:theme.palette.secondary[200],
  }}


    >
      <Remove onClick = {removeSlotHelper} id = {idx.toString()}/>
    </Button>
    }
      </FlexBetween>
      )
    })}
    </FlexBetween>
  )
}

export default ScheduleSlot;

export {SlotHeight};