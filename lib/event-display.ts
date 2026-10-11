const formatDate = (value: string) => {
  const [year, month, day] = value.slice(0, 10).split("-");
  if (!year || !month || !day) return value;
  return `${day}/${month}/${year}`;
};

export const eventDateLabel = (fromDate: string, toDate: string) => {
  const from = formatDate(fromDate);
  const to = formatDate(toDate);
  return from === to ? from : `${from} – ${to}`;
};

export const eventTiming = (fromDate: string, toDate: string) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const from = new Date(`${fromDate.slice(0, 10)}T00:00:00`);
  const to = new Date(`${toDate.slice(0, 10)}T00:00:00`);

  if (today > to) {
    return { label: "Đã diễn ra", className: "bg-slate-500 text-white" };
  }
  if (today >= from) {
    return { label: "Đang diễn ra", className: "bg-teal-500 text-white" };
  }
  return { label: "Sắp diễn ra", className: "bg-indigo-500 text-white" };
};
