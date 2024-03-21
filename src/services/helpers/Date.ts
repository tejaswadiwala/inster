class DateHelper {
  public static getInMMDDYYYFormat(date: Date): string {
    const month = (date.getMonth() + 1).toString().padStart(2, '0') // Months are 0-based, so add 1
    const day = date.getDate().toString().padStart(2, '0')
    const year = date.getFullYear().toString()

    return `${month}/${day}/${year}`
  }

  public static getInYYYY_MM_DDFormat(date: Date): string {
    const year = date.getFullYear()
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0')
    return `${year}-${month}-${day}`
  }
}

export default DateHelper
