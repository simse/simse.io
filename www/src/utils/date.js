const formatDate = (date) => {
    const dateFormat = new Intl.DateTimeFormat('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    })
    const parsedDate = new Date(date)

    return dateFormat.format(parsedDate)
}

export default formatDate