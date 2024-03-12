import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/calendar")({
  component: CalendarPage,
});

export default function CalendarPage() {
  return (
    <div className="p-2">
      <h3>Calendar</h3>
    </div>
  );
}
