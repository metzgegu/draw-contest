export const getCurrentDate = () => {
  return new Date().toISOString().slice(0, 10)
}

export const getDiffedDate = (date: string, diff: number) => {
  const newDate = new Date(date)
  newDate.setDate(newDate.getDate() + diff)
  return newDate.toISOString().slice(0, 10)
}

// Write a function that calculates the number of days between two dates
export const getDaysBetweenDates = (date1: string, date2: string) => {
  const date1Obj = new Date(date1)
  const date2Obj = new Date(date2)
  const diff = Math.abs(date1Obj.getTime() - date2Obj.getTime())
  return Math.ceil(diff / (1000 * 60 * 60 * 24))
}

