import document from "document";
import clock from "clock";
import { AlmostMilitaryClock, LOCALE_DE } from "./clock";

const timeLabel = document.getElementById("time")
const dateLabel = document.getElementById("date")

const myClock = new AlmostMilitaryClock(
  timeLabel,
  dateLabel,
  LOCALE_DE
)

clock.granularity = "minutes";
clock.addEventListener("tick", myClock.updateTime)
