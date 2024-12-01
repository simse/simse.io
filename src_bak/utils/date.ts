const formatDate = (date: Date) => {
  return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })
}

const formatDateWithYear = (date: Date) => {
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

export { formatDate, formatDateWithYear }
