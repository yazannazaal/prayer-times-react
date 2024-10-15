import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import PrayCard from "./PrayCard";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import axios from "axios";
import moment from "moment";
import FajrImg from "../images/fajr.png"
import duhurImg from "../images/duhur1.png"
import asrImg from "../images/asr.png"
import sunsetImg from "../images/sunset.png"
import ishaImg from "../images/isha.png"


export default function MainContent() {
  const [remainingTimeDisplay, setRemainingTimeDisplay] = useState("");
  const [cityName, setCityName] = useState("");
  const [today, setToday] = useState("");
  const [timings, setTimings] = React.useState({
    Fajr: "",
    Dhuhr: "",
    Asr: "",
    Maghrib: "",
    Isha: "",
  });
  const [nextPrayDisplay, setNextPrayDisplay] = useState(0);
  const praysNames = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];

  useEffect(() => {
    const intervalForTimeNow = setInterval(() => {
      const date = moment().format("MMMM Do YYYY, h:mm:ss a");
      setToday(date);
    }, 1000);

    const intervalForNextPray = setInterval(() => {
      counterForNextPray();
    }, 1000);
    return () => {
      clearInterval(intervalForTimeNow);
      clearInterval(intervalForNextPray);
    };
  }, [timings]);

  useEffect(() => {
    axios
      .get(
        `http://api.aladhan.com/v1/timingsByCity?country=SA&city=${cityName}`
      )
      .then((response) => {
        let times = response.data.data.timings;
        setTimings(times);
      });
  }, [cityName]);

  function counterForNextPray() {
    let timeNow = moment();
    let nextPray = null;

    if (
      timeNow.isAfter(moment(timings["Fajr"], "hh:mm")) &&
      timeNow.isBefore(moment(timings["Dhuhr"], "hh:mm"))
    ) {
      nextPray = "Dhuhr";
      console.log(nextPray);
    } else if (
      timeNow.isAfter(moment(timings["Dhuhr"], "hh:mm")) &&
      timeNow.isBefore(moment(timings["Asr"], "hh:mm"))
    ) {
      nextPray = "Asr";
      console.log(nextPray);
    } else if (
      timeNow.isAfter(moment(timings["Asr"], "hh:mm")) &&
      timeNow.isBefore(moment(timings["Maghrib"], "hh:mm"))
    ) {
      nextPray = "Maghrib";
      console.log(nextPray);
    } else if (
      timeNow.isAfter(moment(timings["Maghrib"], "hh:mm")) &&
      timeNow.isBefore(moment(timings["Isha"], "hh:mm"))
    ) {
      nextPray = "Isha";
      console.log(nextPray);
    } else {
      nextPray = "Fajr";
      console.log(nextPray);
    }

    setNextPrayDisplay(nextPray);
    let nextPrayTime = timings[nextPray];
    let nextPrayObject = moment(nextPrayTime, "hh:mm");
    let remainingTime = moment(nextPrayTime, "hh:mm").diff(timeNow);
    let remainingTimeDuration = moment.duration(remainingTime);

    console.log(remainingTimeDuration.hours(), remainingTimeDuration.minutes());

    if (remainingTime < 0) {
      const midNight = moment("23:59:59", "hh:mm:ss").diff(timeNow);
      const afterMidNight = nextPrayObject.diff(moment("00:00:00", "hh:mm:ss"));

      const totalTime = midNight + afterMidNight;
      remainingTime = totalTime;
    }

    setRemainingTimeDisplay(
      `${remainingTimeDuration.hours()} : ${remainingTimeDuration.minutes()} : ${remainingTimeDuration.seconds()}`
    );
  }

  function cityChange(e) {
    setCityName(e.target.value);
  }

  return (
    <>
      <Grid container>
        <Grid xs={6}>
          <div>
            <h2>Time left for {nextPrayDisplay} pray</h2>
            <h2>{remainingTimeDisplay}</h2>
          </div>
        </Grid>
        <Grid xs={6}>
          <div>
            <h2>{today}</h2>
            <h1>{cityName}</h1>
          </div>
        </Grid>
      </Grid>
      <Divider style={{ borderColor: "white" }} />
      {/* Cards */}
      <Stack style={{ marginTop: "50px" }} direction="row" spacing={10}>
        <PrayCard
          pray={praysNames[0]}
          prayTime={timings.Fajr}
          prayImg={FajrImg}
        />
        <PrayCard
          pray={praysNames[1]}
          prayTime={timings.Dhuhr}
          prayImg={duhurImg}
        />
        <PrayCard
          pray={praysNames[2]}
          prayTime={timings.Asr}
          prayImg={asrImg}
        />
        <PrayCard
          pray={praysNames[3]}
          prayTime={timings.Maghrib}
          prayImg={sunsetImg}
        />
        <PrayCard
          pray={praysNames[4]}
          prayTime={timings.Isha}
          prayImg={ishaImg}
        />
      </Stack>
      {/* //Cards */}

      {/* Select */}
      <Stack
        direction="row"
        style={{ justifyContent: "center", marginTop: "30px" }}
      >
        <FormControl style={{ width: "200px", background: "white" }}>
          <InputLabel id="demo-simple-select-label">Choose City</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Age"
            onChange={cityChange}
          >
            <MenuItem value={"Washington"}> Washington</MenuItem>
            <MenuItem value={"Al Qāhirah"}> Al Qāhirah</MenuItem>
            <MenuItem value={"Al Quds"}> Al Quds</MenuItem>
          </Select>
        </FormControl>
      </Stack>
    </>
  );
}
