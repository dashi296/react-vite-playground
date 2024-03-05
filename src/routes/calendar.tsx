import {
  createFileRoute,
  useNavigate,
  useSearch,
} from "@tanstack/react-router";
import { z } from "zod";
import dayjs from "dayjs";
import "react-calendar/dist/Calendar.css";
import { useState } from "react";
import CustomCalendar from "../components/CustomCalendar";

const searchSchema = z.object({
  yearMonth: z
    .string()
    .regex(/^\d{4}-\d{2}$/)
    .optional(),
});

export const Route = createFileRoute("/calendar")({
  component: CalendarPage,
  validateSearch: (search) => searchSchema.parse(search),
});

function CalendarPage() {
  const navigate = useNavigate({ from: Route.fullPath });
  const { yearMonth } = useSearch({
    from: Route.fullPath,
  });
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const currentYearMonth = dayjs().startOf("month");
  const selectedYearMonth = dayjs(yearMonth).startOf("month");

  const onChangeSelectedYearMonth = (date: Date) => {
    const newYearMonth = dayjs(date).startOf("month");
    navigate({
      search: {
        yearMonth: newYearMonth.isSame(currentYearMonth, "month")
          ? undefined
          : newYearMonth.format("YYYY-MM"),
      },
    });
  };

  return (
    <div className="p-2">
      <h3>Calendar</h3>
      <p>Year Month: {selectedYearMonth.format("YYYY/MM/DD")}</p>

      <CustomCalendar
        activeStartDate={selectedYearMonth.toDate()}
        value={selectedDates}
        onChange={setSelectedDates}
        onChangeActiveStartDate={onChangeSelectedYearMonth}
      />

      <div>
        selectedDate: [
        {selectedDates.map((date) => date.toISOString()).join(", ")}]
      </div>
    </div>
  );
}
