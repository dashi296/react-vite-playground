import { createFileRoute /*useSearch*/ } from "@tanstack/react-router";
// import z from "zod";

/*const searchSchema = z.object({
  yearMonth: z
    .string()
    .regex(/^\d{4}-\d{2}$/)
    .optional(),
});*/

export const Route = createFileRoute("/calendar")({
  component: CalendarPage,
  // validateSearch: searchSchema,
});

export default function CalendarPage() {
  /*const search = useSearch({
    from: Route.fullPath,
  })*/

  return (
    <div className="p-2">
      <h3>Calendar</h3>
    </div>
  );
}
