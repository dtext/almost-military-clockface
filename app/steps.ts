import { me as appbit } from "appbit";
import { today } from "user-activity";

function padWithSpace(steps: number): string {
  if (steps > 9999) {
    return steps.toString()
  } else if (steps > 999) {
    return ` ${steps}`
  } else if (steps > 99) {
    return `  ${steps}`
  } else if (steps > 9) {
    return `   ${steps}`
  } else {
    return `    ${steps}`
  }
}

export class StepSensor {

  public updateSteps = (...args: any[]) => {}

  constructor (
    private stepsLabel: Element
  ) {
    if (appbit.permissions.granted("access_activity")) {
        this.updateSteps = this.updateFunc
    }
  }

  private updateFunc = (...args: any[]) => {
    this.stepsLabel.text = padWithSpace(today.adjusted.steps)
  }
}
