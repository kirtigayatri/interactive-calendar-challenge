"use client";
import { useState, useMemo, useEffect } from "react";
import {
  format,
  addMonths,
  subMonths,
  isSameDay,
  isWithinInterval,
  getMonth,
} from "date-fns";
import {
  getDaysInMonth,
  getHolidaysForYear,
  getMonthTheme,
} from "../utils/dateUtils";
import useCalendar from "../hooks/useCalendar";
import DayCell from "./DayCell";
import { motion, AnimatePresence } from "framer-motion";

export default function Calendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [direction, setDirection] = useState(0);
  const { startDate, endDate, handleDateClick } = useCalendar();

  const [notes, setNotes] = useState({});
  const monthKey = format(currentMonth, "yyyy-MM");

  useEffect(() => {
    const saved = localStorage.getItem("calendar-notes");
    if (saved) setNotes(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("calendar-notes", JSON.stringify(notes));
  }, [notes]);

  const handleNoteChange = (value) => {
    setNotes((prev) => ({
      ...prev,
      [monthKey]: value,
    }));
  };

  const days = getDaysInMonth(currentMonth);
  const holidays = useMemo(
    () => getHolidaysForYear(currentMonth),
    [currentMonth]
  );
  const theme = getMonthTheme(getMonth(currentMonth));

  const changeMonth = (val) => {
    setDirection(val);
    setCurrentMonth((prev) =>
      val > 0 ? addMonths(prev, 1) : subMonths(prev, 1)
    );
  };

  const variants = {
    initial: (direction) => ({
      rotateY: direction > 0 ? 90 : -90,
      opacity: 0,
    }),
    animate: {
      rotateY: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      rotateY: direction > 0 ? -90 : 90,
      opacity: 0,
    }),
  };

  return (
    <div className="max-w-5xl mx-auto px-3 py-2">
      {/* 1. Removed h-[520px] to let it flow naturally */}
      <div className="flex flex-col md:flex-row bg-white shadow-2xl rounded-3xl overflow-visible border border-gray-100 min-h-[500px]">

        {/* HERO IMAGE */}
        {/* 2. Made mobile image shorter (h-48) but full height on desktop (md:stretch) */}
        <div className="md:w-5/12 relative h-48 md:h-auto rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none overflow-hidden flex-shrink-0">
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

          <div className="absolute bottom-6 left-6 text-white z-10">
            <h1 className="text-3xl md:text-4xl font-black uppercase leading-tight">
              {format(currentMonth, "MMMM")}
            </h1>
            <p className="text-sm opacity-80">
              {format(currentMonth, "yyyy")}
            </p>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="md:w-7/12 px-4 md:px-6 py-5 flex flex-col w-full">

          {/* HEADER */}
          <div className="flex justify-between items-center mb-4">
            <button onClick={() => changeMonth(-1)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              ❮
            </button>
            <h2 className={`font-semibold text-lg ${theme.color}`}>
              {format(currentMonth, "MMMM yyyy")}
            </h2>
            <button onClick={() => changeMonth(1)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              ❯
            </button>
          </div>

          {/* GRID */}
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={format(currentMonth, "yyyy-MM")}
              custom={direction}
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.5 }}
              style={{ transformStyle: "preserve-3d" }}
              // 3. Removed h-[230px] and let the aspect-square cells dictate the height
              className="grid grid-cols-7 gap-1 md:gap-[3px] w-full"
            >
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                <div key={d} className="text-center text-[10px] md:text-xs font-semibold text-gray-400 uppercase mb-1 md:mb-2">
                  {d}
                </div>
              ))}

              {days.map((day) => (
                <DayCell
                  key={day.toString()}
                  day={day}
                  currentMonth={currentMonth}
                  holidayName={holidays[format(day, "yyyy-MM-dd")]}
                  status={
                    startDate && isSameDay(day, startDate) ? "start"
                      : endDate && isSameDay(day, endDate) ? "end"
                      : startDate && endDate && isWithinInterval(day, { start: startDate, end: endDate }) ? "range"
                      : "none"
                  }
                  onClick={() => handleDateClick(day)}
                />
              ))}
            </motion.div>
          </AnimatePresence>

          {/* NOTES - Flex-grow pushes this to the bottom dynamically */}
          <div className="mt-6 flex-grow flex flex-col justify-end">
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 w-full">
              <h3 className="text-xs font-semibold text-gray-600 mb-1">
                Notes for {format(currentMonth, "MMMM")}
              </h3>
              <textarea
                value={notes[monthKey] || ""}
                onChange={(e) => handleNoteChange(e.target.value)}
                placeholder="Write notes for this month..."
                className="w-full h-20 p-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none text-xs md:text-sm"
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}