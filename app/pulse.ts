import { me as appbit } from "appbit"
import { BodyPresenceSensor } from "body-presence"
import { display } from "display"
import { HeartRateSensor } from "heart-rate"


function padWithSpace(heartRate: number) {
  if (heartRate < 10) {
    return `! ${heartRate}`
  } else if (heartRate < 100) {
    return ` ${heartRate}`
  }
  return heartRate.toString()
}

export class HeartRateMonitor {

  private hrSensor: HeartRateSensor = null

  constructor (
    private heartRateLabel: Element,
  ) {
    if (HeartRateSensor && appbit.permissions.granted("access_heart_rate")) {
      this.hrSensor = new HeartRateSensor({frequency: 1})
      this.hrSensor.addEventListener("reading", this.updateHeartRate)
      
      // run sensor only when on body
      if (BodyPresenceSensor && appbit.permissions.granted("access_activity")) {
        const body = new BodyPresenceSensor()
        body.addEventListener("reading", () => {
          body.present ? this.startMonitoring() : this.stopMonitoring();
        })
        body.start()
      }

      // run sensor only when screen is on
      display.addEventListener("change", () => {
        display.on ? this.startMonitoring() : this.stopMonitoring();
      });
    }
  }

  public startMonitoring = () => {
    this.hrSensor?.start();
  }

  private stopMonitoring = () => {
    this.hrSensor.stop();
    this.heartRateLabel.text = ""
  }

  private updateHeartRate = () => {
    this.heartRateLabel.text = padWithSpace(this.hrSensor.heartRate)
  }
}
