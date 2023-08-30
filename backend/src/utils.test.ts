import { getCurrentDate, getDiffedDate, getDaysBetweenDates } from './utils'

describe('getCurrentDate', () => {
  it('returns the current date in ISO format', () => {
    const currentDate = getCurrentDate()
    const expectedDate = new Date().toISOString().slice(0, 10)
    expect(currentDate).toEqual(expectedDate)
  })
})

describe('getDiffedDate', () => {
  it('returns the date diff days from the input date in ISO format', () => {
    const inputDate = '2022-01-01'
    const diff = 5
    const expectedDate = '2022-01-06'
    const diffedDate = getDiffedDate(inputDate, diff)
    expect(diffedDate).toEqual(expectedDate)
  })
})

describe('getDaysBetweenDates', () => {
  it('returns the number of days between two dates', () => {
    const date1 = '2022-01-01'
    const date2 = '2022-01-06'
    const expectedDays = 5
    const daysBetweenDates = getDaysBetweenDates(date1, date2)
    expect(daysBetweenDates).toEqual(expectedDays)
  })
})