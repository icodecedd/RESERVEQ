import dayjs from "dayjs";

export function getDateOnly(timestamp) {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function formatDate(timestamp) {
  const formatted = dayjs(timestamp).format("MM/DD/YYYY");
  return formatted;
}
