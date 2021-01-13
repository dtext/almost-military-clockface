import { battery } from "power";

export class ChargeSensor {
  constructor(
    private label: Element,
  ) {
    this.setChargeLevel(battery.chargeLevel)
  }

  private setChargeLevel(chargeLevel: number) {
    if (chargeLevel == 100) {
      this.label.text = "9"
    } else {
      this.label.text = Math.floor(chargeLevel / 10).toString()
    }
  }

  public start() {
    battery.addEventListener("change", () => {
      this.setChargeLevel(battery.chargeLevel)
    })
  }
}
