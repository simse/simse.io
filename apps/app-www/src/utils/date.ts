const prettyDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-UK");
}

const prettyDatetime = (date: string) => {
    const parsedDate = new Date(date);

    // format date as "Wednesday, 1 January 2020 12:00"
    return parsedDate.toLocaleDateString("en-UK", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
    });
}

export {
    prettyDate,
    prettyDatetime
}