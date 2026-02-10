"use client";

import { useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

import { EducationFormValues } from "../../lib/education.validation";

const months = [
  { value: 0, label: "Jan" },
  { value: 1, label: "Feb" },
  { value: 2, label: "Mar" },
  { value: 3, label: "Apr" },
  { value: 4, label: "May" },
  { value: 5, label: "Jun" },
  { value: 6, label: "Jul" },
  { value: 7, label: "Aug" },
  { value: 8, label: "Sep" },
  { value: 9, label: "Oct" },
  { value: 10, label: "Nov" },
  { value: 11, label: "Dec" },
];

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 40 }, (_, i) => currentYear - i);

function composeDate(month: number, year: number): Date {
  return new Date(year, month, 1);
}

export function DateRangeField() {
  const { control } = useFormContext<EducationFormValues>();

  return (
    <div className="space-y-6">
      <FormField
        control={control}
        name="startYear"
        render={({ field }) => {
          const date = field.value;
          const selectedMonth = date?.getMonth();
          const selectedYear = date?.getFullYear();

          return (
            <FormItem>
              <FormLabel>Start Date</FormLabel>

              <div className="flex gap-3">
                <FormControl>
                  <Select
                    value={selectedMonth?.toString()}
                    onValueChange={(value) =>
                      field.onChange(
                        composeDate(Number(value), selectedYear ?? currentYear),
                      )
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Month" />
                    </SelectTrigger>
                    <SelectContent>
                      {months.map((m) => (
                        <SelectItem key={m.value} value={m.value.toString()}>
                          {m.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>

                <FormControl>
                  <Select
                    value={selectedYear?.toString()}
                    onValueChange={(value) =>
                      field.onChange(
                        composeDate(selectedMonth ?? 0, Number(value)),
                      )
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Year" />
                    </SelectTrigger>
                    <SelectContent>
                      {years.map((year) => (
                        <SelectItem key={year} value={year.toString()}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
              </div>

              <FormMessage />
            </FormItem>
          );
        }}
      />

      <FormField
        control={control}
        name="endYear"
        render={({ field }) => {
          const date = field.value;
          const selectedMonth = date?.getMonth();
          const selectedYear = date?.getFullYear();

          return (
            <FormItem>
              <FormLabel>End Date</FormLabel>

              <div className="flex gap-3">
                <FormControl>
                  <Select
                    value={selectedMonth?.toString()}
                    onValueChange={(value) =>
                      field.onChange(
                        composeDate(Number(value), selectedYear ?? currentYear),
                      )
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Month" />
                    </SelectTrigger>
                    <SelectContent>
                      {months.map((m) => (
                        <SelectItem key={m.value} value={m.value.toString()}>
                          {m.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>

                <FormControl>
                  <Select
                    value={selectedYear?.toString()}
                    onValueChange={(value) =>
                      field.onChange(
                        composeDate(selectedMonth ?? 0, Number(value)),
                      )
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Year" />
                    </SelectTrigger>
                    <SelectContent>
                      {years.map((year) => (
                        <SelectItem key={year} value={year.toString()}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
              </div>

              <FormMessage />
            </FormItem>
          );
        }}
      />
    </div>
  );
}
