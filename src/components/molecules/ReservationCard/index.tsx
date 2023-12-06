import { Button } from "@/components/atoms/Button";
import { useReservation } from "@/context/ReservationContext";
import { useState } from "react";
import { toast } from "react-toastify";
import { DateRange } from "./styles";
import { BookingSuccessModal } from "../BookingSuccessModal";

interface ReservationCardProps {
  homeId: number;
}

export function ReservationCard({ homeId }: ReservationCardProps) {
  const [dateRange, setDateRange] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { createBooking, getReservedDatesByHomeId } = useReservation();

  const handleOnClick = () => {
    const [startDate, endDate] = dateRange;

    createBooking({
      homeId,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
    });

    toast.success("Reservation created successfully");
    setIsModalOpen(true);
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
    <div className="p-8 rounded-lg border border-gray-300 sm:max-w-sm w-full max-h-64 shadow-xl">
      <h3 className="text-lg font-semibold">
        Please select your check-in and checkout date
      </h3>
      <DateRange
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
