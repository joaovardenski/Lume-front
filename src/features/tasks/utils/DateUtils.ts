export function formatDueDate(dateString: string) {
  if (!dateString) return null;

  const today = getTodayISODate();

  const tomorrow = (() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split("T")[0];
  })();

  if (dateString === today) return "Today";
  if (dateString === tomorrow) return "Tomorrow";

  const [year, month, day] = dateString.split("-");

  return new Date(
    Number(year),
    Number(month) - 1,
    Number(day)
  ).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
  });
}


export function getTodayISODate(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function formatDateTime(timestamp: string) {
  if (!timestamp) return null;

  const date = new Date(timestamp);

  if (isNaN(date.getTime())) return "Invalid date";

  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }) + " " +
  date.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

