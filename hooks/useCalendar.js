import { useState } from "react";
import { isBefore, isSameDay } from "date-fns";

export default function useCalendar() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleDateClick = (date) => {
    if (!startDate || (startDate && endDate)) {
      setStartDate(date);
      setEndDate(null);
    } else if (isSameDay(date, startDate)) {
      setStartDate(null);
      setEndDate(null);
    } else if (isBefore(date, startDate)) {
      setStartDate(date);
      setEndDate(null);
    } else {
      setEndDate(date);
    }
  };

  return { startDate, endDate, handleDateClick };
}
    