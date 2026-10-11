"use client";

import { useState } from "react";

import { Loader } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { formSchema, FormType } from "./form-schema";
import { useCreateEvent } from "@/hooks/mutation/event";

import {
  Dialog,
  DialogTitle,
  DialogFooter,
  DialogHeader,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

import { FormFields } from "./form-fields";

export const ModalAddEvent = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);

  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      location: "",
      fromDate: "",
      toDate: "",
      description: "",
    },
  });

  const { mutate: createEvent, isPending } = useCreateEvent(() => {
    form.reset();
    setOpen(false);
  });

  const onSubmit = (values: FormType) => {
    createEvent(values);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Thêm sự kiện mới</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="max-h-[85vh] space-y-6 px-3 -mx-3 overflow-y-auto custom-scroll"
          >
            <FormFields form={form} isPending={isPending} />

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                disabled={isPending}
                onClick={() => setOpen(false)}
              >
                Huỷ
              </Button>

              <Button type="submit" disabled={isPending}>
                {isPending && <Loader className="size-4 animate-spin" />}
                Thêm sự kiện
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
