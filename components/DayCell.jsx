"use client";
import { format, isSameMonth, isToday } from "date-fns";
import { useState } from "react";

export default function DayCell({ day, currentMonth, status, onClick, holidayName }) {
  const [showTooltip, setShowTooltip] = useState(false);
  const isHoliday = !!holidayName;
  const isCurrentMonth = isSameMonth(day, currentMonth);
  const isTodayFlag = isToday(day);

  const styles = {
    none: isTodayFlag 
      ? `bg-yellow-400 text-yellow-950 font-bold shadow-md transform scale-105 rounded-lg ${isHoliday ? 'ring-2 ring-rose-400 ring-offset-1' : ''}`
      : isHoliday 
        ? "bg-gradient-to-br from-rose-400 to-pink-500 text-white font-bold shadow-sm transform transition-all duration-200 hover:scale-105 hover:shadow-md rounded-lg" 
        : "text-gray-700 hover:bg-blue-50 rounded-lg",
        
    start: isHoliday
      ? `bg-gradient-to-br from-rose-400 to-pink-500 text-white font-bold rounded-l-full z-10 shadow-md ${isTodayFlag ? 'ring-2 ring-yellow-400 ring-offset-1' : ''}`
      : `bg-blue-600 text-white rounded-l-full z-10 ${isTodayFlag ? 'ring-2 ring-yellow-400 ring-offset-1' : ''}`,
      
    end: isHoliday
      ? `bg-gradient-to-br from-rose-400 to-pink-500 text-white font-bold rounded-r-full z-10 shadow-md ${isTodayFlag ? 'ring-2 ring-yellow-400 ring-offset-1' : ''}`
      : `bg-blue-600 text-white rounded-r-full z-10 ${isTodayFlag ? 'ring-2 ring-yellow-400 ring-offset-1' : ''}`,
      
    range: isHoliday
      ? `bg-gradient-to-br from-rose-400 to-pink-500 text-white font-bold shadow-md rounded-lg transform scale-105 z-10 ${isTodayFlag ? 'ring-2 ring-yellow-400 ring-offset-1' : ''}`
      : `bg-blue-100 text-blue-800 ${isTodayFlag ? 'ring-2 ring-yellow-400 ring-offset-1 font-bold z-10 rounded-lg' : ''}`,
  };

  const handleClick = () => {
    if (isHoliday) {
      setShowTooltip(!showTooltip);
      setTimeout(() => setShowTooltip(false), 3000); 
    }
    onClick();
  };

  return (
    <div 
      onClick={handleClick}
      onMouseEnter={() => isHoliday && setShowTooltip(true)}
      onMouseLeave={() => isHoliday && setShowTooltip(false)}
      className={`aspect-square w-full flex items-center justify-center text-sm relative transition-all duration-200 
      ${isCurrentMonth ? "cursor-pointer" : "pointer-events-none"} 
      ${styles[status] || styles.none} 
      ${!isCurrentMonth ? "opacity-30" : ""}`}
    >
      {format(day, "d")}

      {/* The Cloud Tooltip - Rendering logic remains the same, so it still pops up if isHoliday is true! */}
      {isHoliday && showTooltip && (
        <div className="absolute bottom-full mb-2 opacity-100 transform translate-y-0 pointer-events-none transition-all duration-300 z-50">
          <div className="bg-white text-rose-500 text-xs font-serif italic px-4 py-2 rounded-2xl shadow-xl border border-gray-100 whitespace-nowrap">
            {holidayName}
            <svg className="absolute text-white h-2 w-full left-0 top-full" x="0px" y="0px" viewBox="0 0 255 255">
              <polygon className="fill-current" points="0,0 127.5,127.5 255,0"/>
            </svg>
          </div>
        </div>
      )}
    </div>
  );
}