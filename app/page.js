"use client";

import { useState } from "react";
import Calendar from "../components/Calendar";

export default function Home() {
  const [setSelectedDate] = useState(null);

  return (
    <div className="p-4 space-y-4">
      <Calendar onSelectDate={setSelectedDate} />
    </div>
  );
}