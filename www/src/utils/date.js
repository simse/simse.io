const formatDate = (date) => {
    const dateFormat = new Intl.DateTimeFormat('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    })
    const parsedDate = new Date(date)

    return dateFormat.format(parsedDate)
}

const overrideDate = (date, override) => {
    if (override) {
        return formatDate(override)
    }

    return formatDate(date)
}


export { formatDate, overrideDate }