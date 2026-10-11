export const normalizePhone = (value: unknown) => {
  const digits = String(value ?? "").replace(/\D/g, "");
  const phone =
    digits.startsWith("84") && digits.length === 11 ? `0${digits.slice(2)}` : digits;

  if (!/^0\d{9}$/.test(phone)) return null;
  return phone;
};
