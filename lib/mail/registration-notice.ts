import nodemailer from "nodemailer";

const RECIPIENTS = ["Lechau2507@gmail.com", "nguyenvinhbinh18@gmail.com"];

export type RegistrationNotice = {
  name: string;
  companyName: string;
  email: string;
  phone: string;
  eventName: string;
  description: string;
};

export const sendRegistrationNotice = async (notice: RegistrationNotice) => {
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS?.trim();

  if (!user || !pass) {
    throw new Error(
      "Chưa cấu hình SMTP_USER và SMTP_PASS. Thêm mật khẩu ứng dụng Gmail vào .env.local rồi khởi động lại server."
    );
  }

  const port = Number(process.env.SMTP_PORT || 587);
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST?.trim() || "smtp.gmail.com",
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  const content = notice.description.trim() || "(không có)";
  const text = [
    "Có một đăng ký triển lãm mới.",
    "",
    `Họ tên: ${notice.name}`,
    `Tên công ty: ${notice.companyName}`,
    `Email: ${notice.email}`,
    `Số điện thoại: ${notice.phone}`,
    `Triển lãm: ${notice.eventName}`,
    `Nội dung: ${content}`,
  ].join("\n");

  await transporter.sendMail({
    from: process.env.SMTP_FROM?.trim() || user,
    to: RECIPIENTS,
    replyTo: notice.email,
    subject: `Đăng ký triển lãm mới: ${notice.name} — ${notice.eventName}`,
    text,
  });
};
