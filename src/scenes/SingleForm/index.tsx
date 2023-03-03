import { useEffect, useMemo, useState } from "react";
import {
    Box,
    Paper,
    Grid,
    Typography,
    styled,
    FormControl,
    FormHelperText,
    InputLabel,
    Input,
    Button,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { setFormSymb, setFormPerformer, setFormTitle, setFormDesc, setFormLocation } from "../../state";
import CustomButton from "../../components/utility/CustomButton";
import ScheduleSlot2 from "../../components/ScheduleSlot2";
import EventCreation from "../../components/EventCreation";
import Royalties from "../../components/Royalties";
import AvailableCheck from "../../components/AvailableCheck";
import FlexBetween from "../../components/FlexBetween";

const Item = styled(Paper)(({ theme }) => ({
    //   backgroundColor: theme.palette.mode === "dark" ? "" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
}));

const SingleForm = () => {
    const dispatch = useAppDispatch();
    const formSelected = useAppSelector((state) => state.formSlice);
    const dateDataList = useMemo(
        () => formSelected.schedules,
        [formSelected.schedules]
    );
    //   console.log(formSelected.available);
    const submitForm = async () => {
      console.log(formSelected);
      const concertTimes = formSelected.schedules.map((schedule) => {
          const ticketCatQty = formSelected.pricing.map((tcq) => {
              return {
                  category: tcq.category,
                  quantity: tcq.quantity,
                  price: tcq.price,
                  uri: tcq.uri,
              };
          });
          return {
              dateTime: new Date(schedule.dateFrom),
              ticketCatQty: ticketCatQty,
          };
      });
      const formdata :any = {
          performer: formSelected.performer,
          title: formSelected.title,
          symbol: formSelected.symbol,
          description: formSelected.description,
          venue: formSelected.location,
          uri: formSelected.pricing[0].uri,
          collectionNFT: "GsZJ11NToFfzJr2tjZfeCgTEG3saPnTYqTu1ry2P8zkQ",
          concertTimes: concertTimes,
      };
      console.log(formdata);
      const response = await fetch("http://localhost:4242/createConcert", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
            // "Access-Control-Allow-Origin" : "*"
          },
          body: JSON.stringify(formdata)
      });
      const lmao = await(response.json())
      console.log(lmao)
  };

    return (
        <Box
            sx={{
                // height: "100vh",
                width: "100%",
                display: "flex",
                justifyContent: "center",
            }}
        >
            <Paper
                sx={{
                    width: "90%",
                    height: "100%",
                    display: "flex",
                    paddingTop: "5rem",
                }}
                elevation={5}
            >
                <Grid
                    container
                    spacing={3}
                    rowSpacing={0}
                    sx={{ justifyContent: "center" }}
                >
                    <Grid item xs={3}>
                        <Typography variant="h2">Performer</Typography>
                        <FormControl variant="standard" fullWidth>
                            <InputLabel htmlFor="outline-perf">
                                *Required
                            </InputLabel>
                            <Input
                                required
                                id="outline-perf"
                                placeholder="Justin Bieber"
                                sx={{ width: "80%", height: "4rem" }}
                                onChange={(event) => {
                                    dispatch(setFormPerformer(event.target.value));
                                    console.log(formSelected.performer);
                                }}
                                value={formSelected.performer}
                            />
                            <FormHelperText id="outline-title-helper">
                                Your performer
                            </FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography variant="h2">Title</Typography>
                        <FormControl variant="standard" fullWidth>
                            <InputLabel htmlFor="outline-title">
                                *Required
                            </InputLabel>
                            <Input
                                required
                                id="outline-title"
                                placeholder="World Tour"
                                sx={{ width: "80%", height: "4rem" }}
                                onChange={(event) => {
                                    dispatch(setFormTitle(event.target.value));
                                    console.log(formSelected.title);
                                }}
                                value={formSelected.title}
                            />
                            <FormHelperText id="outline-title-helper">
                                Your event title
                            </FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography variant="h2">Event Details</Typography>
                        <FormControl variant="standard" fullWidth>
                            <InputLabel htmlFor="outline-desc">
                                *Required
                            </InputLabel>
                            <Input
                                required
                                id="outline-desc"
                                placeholder="Write something catchy"
                                sx={{ width: "80%", height: "4rem" }}
                                onChange={(event) => {
                                    dispatch(setFormDesc(event.target.value));
                                    console.log(
                                        "The description is " +
                                            formSelected.description
                                    );
                                }}
                                value={formSelected.description}
                            />
                            <FormHelperText id="outline-desc-helper">
                                Give a rundown of events
                            </FormHelperText>
                        </FormControl>
                    </Grid>

                    <Grid item xs={3}>
                        <Typography variant="h2">NFT Symbol</Typography>
                        <FormControl variant="standard" fullWidth>
                            <InputLabel htmlFor="outline-symb">
                                *Required
                            </InputLabel>
                            <Input
                                required
                                id="outline-symb"
                                placeholder="eg. JB23"
                                sx={{ width: "80%", height: "4rem" }}
                                onChange={(event) => {
                                    dispatch(setFormSymb(event.target.value));
                                    console.log(
                                        "The description is " +
                                            formSelected.symbol
                                    );
                                }}
                                value={formSelected.symbol}
                            />
                            <FormHelperText id="outline-desc-helper">
                                Shortform Symbol
                            </FormHelperText>
                        </FormControl>
                    </Grid>
                    
                    <Grid item xs={7}>
                        <Typography variant="h2">Set your location.</Typography>
                        <FormControl variant="standard" fullWidth>
                            <InputLabel htmlFor="outline-location">
                                *Required
                            </InputLabel>
                            <Input
                                required
                                id="outline-location"
                                placeholder="National Stadium"
                                sx={{ width: "80%", height: "4rem" }}
                                onChange={(event) => {
                                    dispatch(
                                        setFormLocation(event.target.value)
                                    );
                                    console.log(formSelected.location);
                                }}
                                value={formSelected.location}
                            />
                            <FormHelperText id="outline-location-helper">
                                Location
                            </FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item xs={10}>
                        <Typography
                            variant="h2"
                            mb={1}
                            sx={{ wordWrap: "break-word" }}
                        >
                            List your schedules.
                        </Typography>

                        {dateDataList.map((el) => {
                            //console.log("The id is " + el.id);
                            return <ScheduleSlot2 dateData={el} key={el.id} />;
                        })}
                    </Grid>
                    <Grid item xs={10} sx={{ justifyContent: "center" }}>
                        <Typography variant="h2">Create events:</Typography>
                    </Grid>
                    <Grid item xs={10}>
                        <EventCreation />
                    </Grid>
                    <Grid item xs={10} sx={{ justifyContent: "center" }}>
                        <Typography variant="h2">
                            Distribute royalties
                        </Typography>
                    </Grid>
                    <Grid item xs={10}>
                        <Royalties />
                    </Grid>
                    {/* This is the availability checkbox */}
                    <Grid item xs={10}>
                        <AvailableCheck />
                    </Grid>
                    <Grid item xs={12}>
                        <FlexBetween
                            sx={{ width: "100%", justifyContent: "center" }}
                        >
                            <CustomButton
                                text={"Submit"}
                                onClick={submitForm}
                            />
                        </FlexBetween>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    );
};

export default SingleForm;
