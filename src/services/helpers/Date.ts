class DateHelper {
  public static getInMMDDYYYFormat(date: Date): string {
    const month = (date.getMonth() + 1).toString().padStart(2, '0') // Months are 0-based, so add 1
    const day = date.getDate().toString().padStart(2, '0')
    const year = date.getFullYear().toString()

    return `${month}/${day}/${year}`
  }
}

export default DateHelper
