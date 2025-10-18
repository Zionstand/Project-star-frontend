"use client";

import { useState } from "react";
import { CalendarIcon } from "lucide-react";
import {
  Button,
  DatePicker,
  Dialog,
  Group,
  Popover,
} from "react-aria-components";

import { DropdownNavProps, DropdownProps } from "react-day-picker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Calendar } from "@/components/ui/calendar";

export default function DatePickerWithDropdowns() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const handleCalendarChange = (
    _value: string | number,
    _e: React.ChangeEventHandler<HTMLSelectElement>
  ) => {
    const _event = {
      target: { value: String(_value) },
    } as React.ChangeEvent<HTMLSelectElement>;
    _e(_event);
  };

  return (
    <DatePicker className="*:not-first:mt-2">
      <div className="flex">
        <Group className="w-full">
          <input
            readOnly
            value={date ? date.toLocaleDateString() : ""}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/50"
          />
        </Group>
        <Button className="z-10 -ms-9 -me-px flex w-9 items-center justify-center rounded-e-md text-muted-foreground/80 transition-[color,box-shadow] outline-none hover:text-foreground data-focus-visible:border-ring data-focus-visible:ring-[3px] data-focus-visible:ring-ring/50">
          <CalendarIcon size={16} />
        </Button>
      </div>

      {/* Popover Calendar */}
      <Popover
        className="z-50 rounded-lg border bg-background text-popover-foreground shadow-lg outline-hidden data-entering:animate-in data-exiting:animate-out data-[entering]:fade-in-0 data-[entering]:zoom-in-95 data-[exiting]:fade-out-0 data-[exiting]:zoom-out-95 data-[placement=bottom]:slide-in-from-top-2"
        offset={4}
      >
        <Dialog
          className="max-h-[inherit] overflow-auto p-2"
          // prevent outside clicks inside the dropdowns from closing the popover
          onClick={(e) => e.stopPropagation()}
        >
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border p-2"
            captionLayout="dropdown"
            defaultMonth={new Date()}
            startMonth={new Date(1980, 0)}
            hideNavigation
            classNames={{
              month_caption: "mx-0",
            }}
            components={{
              DropdownNav: (props: DropdownNavProps) => (
                <div className="flex w-full items-center gap-2">
                  {props.children}
                </div>
              ),
              Dropdown: (props: DropdownProps) => (
                <div
                  onClick={(e) => e.stopPropagation()}
                  onPointerDown={(e) => e.stopPropagation()}
                >
                  <Select
                    value={String(props.value)}
                    onValueChange={(value) => {
                      if (props.onChange) {
                        handleCalendarChange(value, props.onChange);
                      }
                    }}
                  >
                    <SelectTrigger className="h-8 w-fit font-medium first:grow">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent
                      onClick={(e) => e.stopPropagation()}
                      onPointerDown={(e) => e.stopPropagation()}
                      className="max-h-[min(26rem,var(--radix-select-content-available-height))]"
                    >
                      {props.options?.map((option) => (
                        <SelectItem
                          key={option.value}
                          value={String(option.value)}
                          disabled={option.disabled}
                        >
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              ),
            }}
          />
        </Dialog>
      </Popover>
    </DatePicker>
  );
}
