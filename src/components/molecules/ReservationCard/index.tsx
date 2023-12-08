import { Button } from "@/components/atoms/Button";
import { useReservation } from "@/context/ReservationContext";
import { useState } from "react";
import { toast } from "react-toastify";
import { StyleWrapperDatePicker } from "./styles";
import { BookingSuccessModal } from "../BookingSuccessModal";
import { DatePicker } from "antd";
import moment from "moment";

interface ReservationCardProps {
  homeId: number;
}

export function ReservationCard({ homeId }: ReservationCardProps) {
  const [dateRange, setDateRange] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const DateRange = DatePicker.RangePicker;

  const { createBooking, getReservedDatesByHomeId, getRangeOfDates } =
    useReservation();

  const disabledDates = getReservedDatesByHomeId(homeId);

  const handleOnClick = () => {
    const [startDateString, endDateString] = dateRange;
    const startDate = new Date(`${startDateString} EDT`);
    const endDate = new Date(`${endDateString} EDT`);

    if (startDate.getTime() === endDate.getTime()) {
      return toast.error("Check-in and checkout date cannot be the same");
    }

    const rangeOfDates: string[] = getRangeOfDates(startDate, endDate);
    const isDateReserved = rangeOfDates.some((date) =>
      disabledDates.includes(date)
    );

    if (isDateReserved) {
      return toast.error("This date is already reserved");
    }

    createBooking({ homeId, startDate, endDate });

    toast.success("Reservation created successfully");
    setIsModalOpen(true);
  };

  const panelRender = (panelNode: any) => (
    <StyleWrapperDatePicker>{panelNode}</StyleWrapperDatePicker>
  );

  function disabledDate(current: any) {
    return (
      current &&
      (current < moment().startOf("day") ||
        disabledDates.some((date) => current.isSame(date, "day")))
    );
  }

  return (
    <div
      data-testid="ReservationCard"
      className="p-8 rounded-lg border border-gray-300 sm:max-w-sm w-full max-h-64 shadow-xl"
    >
      <h3 className="text-lg font-semibold">
        Please select your check-in and checkout date
      </h3>
      <DateRange
        panelRender={panelRender}
        disabledDate={disabledDate}
        className="w-full p-3 my-4"
        placeholder={["Check-in", "Checkout"]}
        onChange={(dates, dateStrings) => {
          if (dateStrings === null) return;
          setDateRange(dateStrings);
        }}
      />
      <Button text="Reserve" onClick={handleOnClick} />
      <BookingSuccessModal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
      />
    </div>
  );
}
