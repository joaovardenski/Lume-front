export function formatDueDate(dateString: string) {
  if (!dateString) return null;
  const date = new Date(dateString);
  const today = new Date();

  const isToday = date.toDateString() === today.toDateString();

  const isTomorrow =
    date.toDateString() ===
    new Date(today.setDate(today.getDate() + 1)).toDateString();

  if (isToday) return "Today";
  if (isTomorrow) return "Tomorrow";

  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
  });
}

export function getTodayISODate(): string {
  const today = new Date();
  return today.toISOString().split("T")[0];
}

