import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function MyCalendar() {
  const [date, setDate] = useState(new Date());

  const onChange = (newDate) => {
    setDate(newDate);
    console.log(newDate);
  };

  return (
    <div className="bg-black">
      <Calendar onChange={onChange} value={date} />
    </div>
  );
}

export default MyCalendar;
