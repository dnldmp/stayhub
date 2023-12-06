import { Modal } from "antd";
import { useState } from "react";
import { DateRange } from "../ReservationCard/styles";
import { useReservation } from "@/context/ReservationContext";
import { Button } from "@/components/atoms/Button";
import { toast } from "react-toastify";

interface EditReservationModalProps {
  bookingId: number;
  homeId: number;
  open: boolean;
  onCancel: () => void;
}

export function EditReservationModal({
  bookingId,
  homeId,
  open,
  onCancel,
}: EditReservationModalProps) {
  const [dateRange, setDateRange] = useState<string[]>([]);

  const { getReservedDatesByHomeId, updateBooking } = useReservation();

  function disabledDate(current: any) {
    const disabledDates = getReservedDatesByHomeId(homeId);

    return (
      current &&
      disabledDates.some((date) => {
        return current.isSame(date, "day");
      })
    );
  }

  const handleOnClick = () => {
    const [startDate, endDate] = dateRange;

    updateBooking(bookingId, {
      startDate: new Date(startDate),
      endDate: new Date(endDate),
    });

    toast.success("Reservation updated successfully");
    onCancel();
  };

  return (
    <Modal
      title="Edit reservation"
      onCancel={onCancel}
      footer={null}
      open={open}
    >
      <div className="p-8  w-full">
        <h3 className="text-lg font-semibold">
          Please select your new check-in and checkout date
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
        <Button text="Update Reservation" onClick={handleOnClick} />
      </div>
    </Modal>
  );
}
