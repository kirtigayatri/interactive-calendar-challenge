"use client";

import { useState } from "react";
import Calendar from "../components/Calendar";
import NotesPanel from "../components/NotesPanel";
import Header from "../components/Header";

export default function Home() {
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <div className="p-4 space-y-4">
      <Header />
      <Calendar onSelectDate={setSelectedDate} />
      <NotesPanel selectedDate={selectedDate} />
    </div>
  );
}