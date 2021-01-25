import document from "document";
import clock from "clock";
import { AlmostMilitaryClock } from "./clock";
import { HeartRateMonitor } from "./pulse";
import { ChargeSensor } from "./charge";
import { StepSensor } from "./steps";


const timeLabel = document.getElementById("time")
const dateLabel = document.getElementById("date")
const dayLabel = document.getElementById("day")

const myClock = new AlmostMilitaryClock(timeLabel, dateLabel, dayLabel)

clock.granularity = "minutes";

const stepLabel = document.getElementById("step-counter")
const stepSensor = new StepSensor(stepLabel)

clock.addEventListener("tick", (event) => {
  myClock.updateTime(event)
  stepSensor.updateSteps()
})

const clicker = document.getElementById("clicker")
clicker.addEventListener("click", () => {
  stepSensor.updateSteps()
})

const heartRateLabel = document.getElementById("heart-rate")
const hrm = new HeartRateMonitor(heartRateLabel)
hrm.turnOn()

const chargeLabel = document.getElementById("charge-level")
new ChargeSensor(chargeLabel).start()

