<script>
    // hour range to message map
    // the number is the minimum hour it must be
    const messageMap = {
        18: "Good evening",
        12: "Good afternoon",
        4: "Good morning",
        0: "Hello fellow night owl!",
    }

    // get browser hour
    const browserHour = 5;

    // map message
    let message = "Howdy!";
    Object.keys(messageMap).forEach(hour => {
        if (hour < browserHour) {
            message = messageMap[hour];
        }
    });
</script>

<span>{message}</span>