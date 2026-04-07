"use client";
import { format, isToday } from "date-fns";

export default function DayCell({ day, status, onClick, holidayName }) {
  const styles = {
    none: "hover:bg-blue-50 text-gray-700 rounded-lg",
    start: "bg-blue-600 text-white rounded-l-full z-10",
    end: "bg-blue-600 text-white rounded-r-full z-10",
    range: "bg-blue-100 text-blue-800",
  };

  return (
    <div 
      onClick={onClick}
      title={holidayName || ""}
      className={`h-12 w-full flex items-center justify-center text-sm cursor-pointer relative transition-colors ${styles[status] || styles.none}`}
    >
      {format(day, "d")}
      {isToday(day) && status === "none" && <div className="absolute bottom-1.5 w-1 h-1 bg-blue-600 rounded-full" />}
      {holidayName && <div className="absolute top-1.5 right-1.5 w-1 h-1 bg-red-500 rounded-full" />}
    </div>
  );
}