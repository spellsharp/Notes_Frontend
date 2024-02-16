import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styled from "styled-components";

function MyCalendar({ onDateChange }) {
  const [date, setDate] = useState(new Date());
  const onChange = (newDate) => {
    const isoDate = newDate.toISOString();
    // const dateObj = new Date(isoDate);
    setDate(isoDate);
    onDateChange(isoDate);
  };
  useEffect(() => {
    onDateChange(date);
  }, [date]);

  const CalendarContainer =   styled.div`
    .react-calendar {
      width: 350px;
      max-width: 100%;
      background: rgb(139 92 246);
      border: 1px solid rgb(0, 0, 0);
      font-family: Arial, Helvetica, sans-serif;
      line-height: 1.125em;
    }

    .react-calendar__navigation button {
      min-width: 44px;
      background-color: rgb(139 92 246);
    }

    .react-calendar__navigation button:hover {
      background-color: rgba(124, 58, 237, 0.233);
    }

    .react-calendar__month-view__weekdays {
      text-align: center;
      text-transform: uppercase;
      font: inherit;
      font-size: 0.75em;
      font-weight: bold;
      background-color: rgb(139 92 246);
    }

    /* Navigation styles */
    .react-calendar__navigation {
      display: flex;
      justify-content: space-between;
      color: #ffffff;
    }

    /* Tile styles */
    .react-calendar__tile {
      cursor: pointer;
      background-color: rgb(139 92 246);
      /* Other styles... */
    }

    /* Active day styles */
    .react-calendar__tile--active {
      background-color: rgba(124, 58, 237, 1);
      color: white;
      /* Other styles... */
    }

    .react-calendar__tile:hover {
      // background-color: #2e2e2e;
      background-color: rgba(124, 58, 237, 0.5);
    }

    .react-calendar--selectRange .react-calendar__tile--hover {
      background-color: #e6e6e6;
    }

    /* Other custom styles... */
  `;

  return (
    <CalendarContainer>
      <Calendar onChange={onChange} value={date} />
    </CalendarContainer>
  );
}

export default MyCalendar;
