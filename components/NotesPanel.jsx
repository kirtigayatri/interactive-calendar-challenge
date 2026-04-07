"use client";
import { useState, useEffect } from "react";

export default function NotesPanel() {
  const [note, setNote] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("calendar-note");
    if (saved) setNote(saved);
  }, []);

  const saveNote = () => {
    localStorage.setItem("calendar-note", note);
    alert("Note saved!");
  };

  return (
    <div className="mt-8 bg-white p-6 rounded-3xl shadow-lg border border-gray-100">
      <h3 className="font-bold text-lg mb-4">General Month Notes</h3>
      <textarea 
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Write your plans or memos here..."
        className="w-full h-32 p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
      />
      <button 
        onClick={saveNote}
        className="mt-4 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
      >
        Save Note
      </button>
    </div>
  );
}