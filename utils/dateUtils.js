import { startOfMonth, endOfMonth, eachDayOfInterval, format, getYear } from 'date-fns';
import Holidays from 'date-holidays';

export const getDaysInMonth = (date) => {
  const start = startOfMonth(date);
  const end = endOfMonth(date);
  return eachDayOfInterval({ start, end });
};

export const getHolidaysForYear = (date) => {
  const year = getYear(date);
  const hd = new Holidays('IN'); 
  const holidayList = hd.getHolidays(year);
  const formattedHolidays = {};
  holidayList.forEach(h => {
    const key = format(new Date(h.date), 'yyyy-MM-dd');
    formattedHolidays[key] = h.name;
  });
  return formattedHolidays;
};

export const getSeasonTheme = (monthIndex) => {
  const themes = {
    spring: { color: "text-green-600", img: "https://images.unsplash.com/photo-1490750967868-88aa4486c946" },
    summer: { color: "text-orange-500", img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e" },
    autumn: { color: "text-amber-700", img: "https://images.unsplash.com/photo-1507181318624-c397b77ad98a" },
    winter: { color: "text-blue-600", img: "https://images.unsplash.com/photo-1433001356161-7c57ef23029b" }
  };
  if (monthIndex >= 2 && monthIndex <= 4) return themes.spring;
  if (monthIndex >= 5 && monthIndex <= 7) return themes.summer;
  if (monthIndex >= 8 && monthIndex <= 10) return themes.autumn;
  return themes.winter;
};