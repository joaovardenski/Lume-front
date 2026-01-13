export function formatDueDate(dateString: string) {
  if (!dateString) return null;

  // Normaliza qualquer formato para YYYY-MM-DD
  const normalized = normalizeDate(dateString);

  if (!normalized) return null;

  const today = getTodayISODate();

  const tomorrow = (() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return getISODate(d);
  })();

  if (normalized === today) return "Today";
  if (normalized === tomorrow) return "Tomorrow";

  const [year, month, day] = normalized.split("-");

  return new Date(
    Number(year),
    Number(month) - 1,
    Number(day)
  ).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
  });
}

export function normalizeDate(value: string): string | null {
  // Já está no formato correto
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return value;
  }

  // ISO / timestamp
  const date = new Date(value);

  if (isNaN(date.getTime())) return null;

  return getISODate(date);
}

export function getISODate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
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

