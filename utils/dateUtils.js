import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, format, getYear} from 'date-fns';
import Holidays from 'date-holidays';

export const getDaysInMonth = (date) => {
  // Start from the beginning of the week containing the 1st
  const start = startOfWeek(startOfMonth(date), { weekStartsOn: 0 }); // Sunday

  // End at the end of the week containing the last day
  const end = endOfWeek(endOfMonth(date), { weekStartsOn: 0 });

  const days = eachDayOfInterval({ start, end });

  // Ensure exactly 42 days (6 rows × 7 columns)
  if (days.length < 42) {
    const lastDay = days[days.length - 1];
    const extraDays = 42 - days.length;

    for (let i = 1; i <= extraDays; i++) {
      const nextDay = new Date(lastDay);
      nextDay.setDate(lastDay.getDate() + i);
      days.push(nextDay);
    }
  }

  return days;
};

export const getHolidaysForYear = (date) => {
  const year = getYear(date);
  
  // 1. Initialize the library for National + States with high Hindu festival recognition
  const national = new Holidays('IN');
  const upHolidays = new Holidays('IN', 'UP'); // Adds Diwali, Holi, Raksha Bandhan, Maha Shivaratri
  const mhHolidays = new Holidays('IN', 'MH'); // Adds Ganesh Chaturthi, Gudi Padwa
  const wbHolidays = new Holidays('IN', 'WB'); // Adds Durga Puja, Saraswati Puja
  
  // 2. Fetch all the lists for whatever year the user is currently looking at
  const list1 = national.getHolidays(year) || [];
  const list2 = upHolidays.getHolidays(year) || [];
  const list3 = mhHolidays.getHolidays(year) || [];
  const list4 = wbHolidays.getHolidays(year) || [];
  
  const formattedHolidays = {};
  
  // 3. Merge them all together safely
  [...list1, ...list2, ...list3, ...list4].forEach(h => {
    // Convert the library's date format into our standard YYYY-MM-DD
    const key = format(new Date(h.date), 'yyyy-MM-dd');
    
    if (!formattedHolidays[key]) {
      // If the date is empty, add the festival
      formattedHolidays[key] = h.name;
    } else if (!formattedHolidays[key].includes(h.name)) {
      // If there's already a festival on this day (e.g., National holiday + Hindu festival), merge them!
      formattedHolidays[key] += ` & ${h.name}`;
    }
  });

  // 4. Manual Additions for Solar/Fixed Dates
  // Most Hindu festivals are lunar, but a few are solar and fall on the same day every year.
  // You can manually inject them here if the library misses them.
  const customFestivals = {
    [`${year}-01-14`]: "Makar Sankranti",
    [`${year}-01-15`]: "Magh Bihu",
    [`${year}-04-15`]: "Rongali Bihu",
    [`${year}-10-18`]: "Kati Bihu", 
  };
  
  return { ...formattedHolidays, ...customFestivals };
};

export const getMonthTheme = (monthIndex) => {
  // An array of 12 themes mapping directly to Jan (0) through Dec (11)
  const monthlyThemes = [
    { color: "text-slate-600", img: "/months/jan.jpg" },
    { color: "text-rose-500", img: "/months/feb.jpg" },
    { color: "text-emerald-600", img: "/months/mar.jpg" },
    { color: "text-violet-500", img: "/months/apr.jpg" },
    { color: "text-green-500", img: "/months/may.jpg" },
    { color: "text-yellow-500", img: "/months/jun.jpg" },
    { color: "text-orange-500", img: "/months/jul.jpg" },
    { color: "text-amber-600", img: "/months/aug.jpg" },
    { color: "text-orange-600", img: "/months/sep.jpg" },
    { color: "text-orange-700", img: "/months/oct.jpg" },
    { color: "text-stone-600", img: "/months/nov.jpg" },
    { color: "text-red-600", img: "/months/dec.jpg" }
  ];

  // Instantly return the exact object for the current month
  return monthlyThemes[monthIndex];
};