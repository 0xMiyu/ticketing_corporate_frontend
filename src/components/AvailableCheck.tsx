import { useState } from "react";

import { useAppDispatch, useAppSelector } from "../state/hooks";
import { setFormAvailable } from "../state";

import { Box, Checkbox, FormControlLabel } from "@mui/material";

const AvailableCheck = () => {

    const dispatch = useAppDispatch();
    const formSelected = useAppSelector(state => state.formSlice);

    const [checked, setChecked] = useState(false);
    const checkHandler = () => {
        setChecked(!checked);
        console.log("The checked on client side is " + checked);
        dispatch(setFormAvailable(checked));
        console.log("The checked on Redux store is " + formSelected.available);
    }
    return (
        <FormControlLabel value = "Make this event available?" 
        control = {<Checkbox
            checked = {checked}
            onChange = {checkHandler}
        />} 
        label = "Make this event available?" labelPlacement = "start"/>
    )
}

export default AvailableCheck;