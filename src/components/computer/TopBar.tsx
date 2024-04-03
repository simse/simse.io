import { useState, useEffect } from "preact/hooks";

const TopBar = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    setInterval(() => {
      setTime(new Date());
    }, 1000);
  }, []);

  const timeString = (currentDate: Date): string => {
    return currentDate.toLocaleTimeString("en-UK", {
      hour: "numeric",
      minute: "numeric",
    });
  };

  const dateString = (currentDate: Date): string => {
    return currentDate
      .toLocaleDateString("en-UK", {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
      })
      .replaceAll(",", "");
  };

  return (
    <header class="border-b border-black flex px-3">
      <span>simonOS</span>

      <div class="ml-auto px-3 border-x border-black">
        <span>{timeString(time)}</span>
      </div>

      <span class="pl-3">{dateString(time)}</span>
    </header>
  );
};

export default TopBar;
