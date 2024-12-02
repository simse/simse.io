const parseDate = (date: string | Date): Date => {
  if (typeof date === 'string') return new Date(date)

  return date
}

const formatDate = (date: string | Date) => {
  return parseDate(date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
  })
}

const formatDateWithYear = (date: string | Date) => {
  return parseDate(date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

export { formatDate, formatDateWithYear }
