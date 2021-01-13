import document from "document";
import clock from "clock";
import { AlmostMilitaryClock, LOCALE_DE } from "./clock";
import { HeartRateMonitor } from "./pulse";
import { ChargeSensor } from "./charge";


const timeLabel = document.getElementById("time")
const dateLabel = document.getElementById("date")

const myClock = new AlmostMilitaryClock(
  timeLabel,
  dateLabel,
  LOCALE_DE
)

clock.granularity = "minutes";
clock.addEventListener("tick", myClock.updateTime)

const heartRateLabel = document.getElementById("heart-rate")
const hrm = new HeartRateMonitor(heartRateLabel)
hrm.startMonitoring()

const chargeLabel = document.getElementById("charge-level")
new ChargeSensor(chargeLabel).start()

