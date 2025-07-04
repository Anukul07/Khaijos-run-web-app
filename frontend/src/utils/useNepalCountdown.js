import { useEffect, useState } from "react";

const useNepalCountdown = (utcDate) => {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const nowNepal = new Date().getTime() + 5.75 * 60 * 60 * 1000;
      const target = new Date(utcDate).getTime();
      const diff = target - nowNepal;

      if (diff <= 0) {
        setTimeLeft("Started");
        clearInterval(interval);
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft(
        `${String(hours).padStart(2, "0")}h ` +
          `${String(minutes).padStart(2, "0")}m ` +
          `${String(seconds).padStart(2, "0")}s`
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [utcDate]);

  return timeLeft;
};
export default useNepalCountdown;
