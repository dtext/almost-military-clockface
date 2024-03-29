import { TickEvent } from "clock";
import { gettext } from "i18n";

function padWithZero(num: number) {
  if (num < 10) {
    return `0${num}`.toString()
  } else {
    return num.toString()
  }
}

function localizedMonthName(num: number) {
  return gettext([
    "jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"
  ][num])
}

function localizedDayName(num: number) {
  return gettext([
    "sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"
  ][num])
}

export class AlmostMilitaryClock {
  constructor(
    private timeLabel: Element,
    private dateLabel: Element,
    private dayLabel: Element,
  ) {}

  private getTimeString = (hours: number, minutes: number): string => {
    if (hours < 0 || hours > 23) {
      return "err 0 < hours < 24"
    }
    if (minutes < 0 || minutes > 59) {
      return "err 0 < minutes < 60"
    }
    const hourString = padWithZero(hours)
    const minuteString = padWithZero(minutes)
    return hourString + minuteString
  }

  private getDateString = (day: number, month: number, year: number): string => {
    if (day < 1 || day > 31) {
      return "err 1 < day < 32"
    }
    if (month < 0 || month > 11) {
      return "err 0 < month < 12"
    }
    const lastTwoYearDigits = year.toString().slice(-2)
    const result = `${day} ${localizedMonthName(month)} ${lastTwoYearDigits}`.toString()
    return result
  }

  public updateTime = (tickEvent: TickEvent) => {
    this.timeLabel.text = this.getTimeString(
      tickEvent.date.getHours(),
      tickEvent.date.getMinutes(),
    )
    this.dateLabel.text = this.getDateString(
      tickEvent.date.getDate(),
      tickEvent.date.getMonth(),
      tickEvent.date.getFullYear(),
    )
    this.dayLabel.text = localizedDayName(
      tickEvent.date.getDay(),
    )
  }
}
