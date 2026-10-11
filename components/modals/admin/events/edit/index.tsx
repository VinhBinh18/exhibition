"use client";

import { useState, useEffect } from "react";

import { Loader } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { ExhibitionEventRecord } from "@/types/records";
import { formSchema, FormType } from "./form-schema";
import { useUpdateEvent } from "@/hooks/mutation/event";

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

const dateInput = (value?: string) => (value ? value.slice(0, 10) : "");

type ModalEditEventProps = {
  event: ExhibitionEventRecord;
  children: React.ReactNode;
  setOpenDropdown: (open: boolean) => void;
};

export const ModalEditEvent = ({
  children,
  event,
  setOpenDropdown,
}: ModalEditEventProps) => {
  const [open, setOpen] = useState(false);

  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: event.name,
      location: event.location,
      fromDate: dateInput(event.fromDate),
      toDate: dateInput(event.toDate),
      description: event.description,
    },
  });

  useEffect(() => {
    if (open) {
      form.reset({
        name: event.name,
        location: event.location,
        fromDate: dateInput(event.fromDate),
        toDate: dateInput(event.toDate),
        description: event.description,
      });
    }
  }, [open, event, form]);

  const { mutate: updateEvent, isPending } = useUpdateEvent(() => {
    setOpen(false);
    setOpenDropdown(false);
  });

  const onSubmit = (values: FormType) => {
    updateEvent({ id: event.id, ...values });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Chỉnh sửa sự kiện</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="h-[85vh] space-y-6 px-3 -mx-3 overflow-y-auto custom-scroll"
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
                Lưu thay đổi
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
