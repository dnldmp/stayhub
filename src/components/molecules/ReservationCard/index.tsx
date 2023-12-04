import { Button } from "@/components/atoms/Button";
import { useReservation } from "@/context/ReservationContext";
import { DatePicker } from "antd";
import { useState } from "react";
import moment from "moment";

interface ReservationCardProps {
  homeId: number;
}

export function ResarvationCard({ homeId }: ReservationCardProps) {
  const [dateRange, setDateRange] = useState<string[]>([]);
  const { RangePicker } = DatePicker;
  const { createBooking, getReservedDatesByHomeId } = useReservation();

  const handleOnClick = () => {
    const [startDate, endDate] = dateRange;
    createBooking({ homeId, startDate, endDate });
  };

  function disabledDate(current: any) {
    const disabledDates = getReservedDatesByHomeId(homeId);

    return (
      current &&
      disabledDates.some((date) => {
        return current.isSame(date, "day");
      })
    );
  }

  return (
    <div className="p-8 rounded-lg border border-gray-300 max-w-sm shadow-xl">
      <h3 className="text-lg font-bold">
        Please select your check-in and checkout date
      </h3>
      <RangePicker
        disabledDate={disabledDate}
        className="w-full p-3 my-4"
        placeholder={["Check-in", "Checkout"]}
        onChange={(dates, dateStrings) => {
          if (dateStrings === null) return;
          setDateRange(dateStrings);
        }}
      />
      <Button text="Reserve" onClick={handleOnClick} />
    </div>
  );
}
