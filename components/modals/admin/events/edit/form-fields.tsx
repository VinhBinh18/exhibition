"use client";

import { UseFormReturn } from "react-hook-form";

import { FormType } from "./form-schema";

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type FormFieldsProps = {
  form: UseFormReturn<FormType>;
  isPending: boolean;
};

export const FormFields = ({ form, isPending }: FormFieldsProps) => (
  <>
    <FormField
      control={form.control}
      name="name"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Tên triển lãm</FormLabel>
          <FormControl>
            <Input {...field} disabled={isPending} placeholder="Tên triển lãm" />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />

    <FormField
      control={form.control}
      name="location"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Địa điểm</FormLabel>
          <FormControl>
            <Input {...field} disabled={isPending} placeholder="Thành phố, địa điểm" />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />

    <div className="grid gap-4 sm:grid-cols-2">
      <FormField
        control={form.control}
        name="fromDate"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Từ ngày</FormLabel>
            <FormControl>
              <Input {...field} type="date" disabled={isPending} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="toDate"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Đến ngày</FormLabel>
            <FormControl>
              <Input {...field} type="date" disabled={isPending} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>

    <FormField
      control={form.control}
      name="description"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Mô tả</FormLabel>
          <FormControl>
            <Textarea {...field} disabled={isPending} className="min-h-24" />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  </>
);
