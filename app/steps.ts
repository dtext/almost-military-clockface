import { me as appbit } from "appbit";
import { today } from "user-activity";

export class StepSensor {

  public updateSteps = (...args: any[]) => {
    console.log("uninitialized StepSensor update")
    console.log(this)
  }

  constructor (
    private stepsLabel: Element
  ) {
    if (appbit.permissions.granted("access_activity")) {
        this.updateSteps = this.updateFunc
    }
  }

  private updateFunc = (...args: any[]) => {
    console.log("initialized StepSensor update")
    console.log(JSON.stringify(this))
    this.stepsLabel.text = today.adjusted.steps.toString()
  }
}
