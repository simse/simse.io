const prettyDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-UK");
}

export {
    prettyDate
}