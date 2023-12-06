import { DatePicker, Modal } from "antd";
import { useState } from "react";
import { useReservation } from "@/context/ReservationContext";
import { Button } from "@/components/atoms/Button";
import { toast } from "react-toastify";
import { StyleWrapperDatePicker } from "./styles";

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
  const DateRange = DatePicker.RangePicker;

  const panelRender = (panelNode: any) => (
    <StyleWrapperDatePicker>{panelNode}</StyleWrapperDatePicker>
  );

  const { getReservedDatesByHomeId, updateBooking, getRangeOfDates } =
    useReservation();
  const disabledDates = getReservedDatesByHomeId(homeId);

  function disabledDate(current: any) {
    return (
      current &&
      disabledDates.some((date) => {
        return current.isSame(date, "day");
      })
    );
  }

  const handleUpdate = () => {
    const [startDateString, endDateString] = dateRange;

    const startDate = new Date(`${startDateString} EDT`);
    const endDate = new Date(`${endDateString} EDT`);

    const rangeOfDates: string[] = getRangeOfDates(startDate, endDate);
    const isDateReserved = rangeOfDates.some((date) =>
      disabledDates.includes(date)
    );

    if (isDateReserved) {
      return toast.error("This date is already reserved");
    }

    updateBooking(bookingId, { startDate, endDate });

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
          panelRender={panelRender}
          disabledDate={disabledDate}
          className="w-full p-3 my-4"
          placeholder={["Check-in", "Checkout"]}
          onChange={(dates, dateStrings) => {
            if (dateStrings === null) return;
            setDateRange(dateStrings);
          }}
        />
        <Button text="Update Reservation" onClick={handleUpdate} />
      </div>
    </Modal>
  );
}
