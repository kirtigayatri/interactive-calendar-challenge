"use client";
import { useState, useMemo } from "react";
import { format, addMonths, subMonths, isSameDay, isWithinInterval, getMonth } from "date-fns";
import { getDaysInMonth, getHolidaysForYear, getSeasonTheme } from "../utils/dateUtils";
import useCalendar from "../hooks/useCalendar";
import DayCell from "./DayCell";
import NotesPanel from "./NotesPanel";
import { motion, AnimatePresence } from "framer-motion";

export default function Calendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [direction, setDirection] = useState(0);
  const { startDate, endDate, handleDateClick } = useCalendar();

  const days = getDaysInMonth(currentMonth);
  const holidays = useMemo(() => getHolidaysForYear(currentMonth), [currentMonth]);
  const theme = getSeasonTheme(getMonth(currentMonth));

  const changeMonth = (val) => {
    setDirection(val);
    setCurrentMonth(prev => val > 0 ? addMonths(prev, 1) : subMonths(prev, 1));
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex flex-col md:flex-row bg-white shadow-2xl rounded-3xl overflow-hidden border border-gray-100 min-h-[550px]">
        {/* Responsive Hero Image */}
        <div className="md:w-5/12 relative h-64 md:h-auto overflow-hidden bg-gray-200">
          <AnimatePresence mode="wait">
            <motion.img
              key={theme.img}
              src={theme.img}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute bottom-10 left-10 text-white z-10">
            <h1 className="text-5xl font-black uppercase">{format(currentMonth, "MMMM")}</h1>
            <p className="text-lg opacity-80">{format(currentMonth, "yyyy")}</p>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="md:w-7/12 p-8">
          <div className="flex justify-between items-center mb-8">
            <button onClick={() => changeMonth(-1)} className="p-2 hover:bg-gray-100 rounded-full">❮</button>
            <h2 className={`font-bold text-xl ${theme.color}`}>{format(currentMonth, "MMMM yyyy")}</h2>
            <button onClick={() => changeMonth(1)} className="p-2 hover:bg-gray-100 rounded-full">❯</button>
          </div>

          <div className="grid grid-cols-7 gap-1">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
              <div key={d} className="text-center text-[10px] font-bold text-gray-400 uppercase mb-2">{d}</div>
            ))}
            {days.map(day => (
              <DayCell
                key={day.toString()}
                day={day}
                holidayName={holidays[format(day, 'yyyy-MM-dd')]}
                status={startDate && isSameDay(day, startDate) ? "start" : 
                        endDate && isSameDay(day, endDate) ? "end" : 
                        startDate && endDate && isWithinInterval(day, {start: startDate, end: endDate}) ? "range" : "none"}
                onClick={() => handleDateClick(day)}
              />
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-gray-50 rounded-xl text-sm text-gray-500">
            <strong>Selected Range:</strong> {startDate ? format(startDate, 'PP') : 'Select start'} — {endDate ? format(endDate, 'PP') : 'Select end'}
          </div>
        </div>
      </div>

      {/* Integrated Notes Section */}
      <NotesPanel />
    </div>
  );
}