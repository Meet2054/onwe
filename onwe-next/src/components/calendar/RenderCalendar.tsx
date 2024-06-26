import { addDays, addMonths, format, subDays, subMonths } from "date-fns";
import EventCalendar from "./Calendar";

const current = new Date();
const prevMonth_2 = subMonths(current, 2);
const prevMonth = subMonths(current, 1);
const nextMonth = addMonths(current, 1);
const nextMonth_2 = addMonths(current, 2);

const monthArray = [current, nextMonth, nextMonth_2].map((date) =>
  format(date, "MMMM yyyy").toLocaleUpperCase()
);

function RenderCalendar() {
  return (
    <>
      {monthArray.map((month, index) => (
        <EventCalendar key={index} month={month} />
      ))}
    </>
  );
}

export default RenderCalendar;
