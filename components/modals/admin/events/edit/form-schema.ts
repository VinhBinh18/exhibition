import z from "zod";

export const formSchema = z
  .object({
    name: z.string().min(1, "Vui lòng nhập tên triển lãm"),
    location: z.string().min(1, "Vui lòng nhập địa điểm"),
    fromDate: z.string().min(1, "Vui lòng chọn ngày bắt đầu"),
    toDate: z.string().min(1, "Vui lòng chọn ngày kết thúc"),
    description: z.string().min(1, "Vui lòng nhập mô tả"),
  })
  .refine((value) => value.toDate >= value.fromDate, {
    path: ["toDate"],
    message: "Ngày kết thúc phải sau hoặc bằng ngày bắt đầu",
  });

export type FormType = z.infer<typeof formSchema>;
