import { DatePicker, Modal } from "antd";
import { useState } from "react";
import { Booking, useReservation } from "@/context/ReservationContext";
import { Button } from "@/components/atoms/Button";
import { toast } from "react-toastify";
import { StyleWrapperDatePicker } from "./styles";
import dayjs from "dayjs";

interface EditReservationModalProps {
  bookingId: number;
  open: boolean;
  onCancel: () => void;
}

export function EditReservationModal({
  bookingId,
  open,
  onCancel,
}: EditReservationModalProps) {
  const [dateRange, setDateRange] = useState<string[]>([]);
  const DateRange = DatePicker.RangePicker;

  const panelRender = (panelNode: any) => (
    <StyleWrapperDatePicker>{panelNode}</StyleWrapperDatePicker>
  );

  const {
    getReservedDatesByHomeId,
    updateBooking,
    getRangeOfDates,
    getReservationById,
  } = useReservation();

  const bookingInformation = getReservationById(bookingId);
  if (!bookingInformation) {
    return null;
  }
  const { homeId, startDate, endDate } = bookingInformation;
  const disabledDates = getReservedDatesByHomeId(homeId!);
  const bookingDatesRange = getRangeOfDates(startDate, endDate);

  function disabledDate(current: any) {
    return (
      current &&
      (current < dayjs().startOf("day") ||
        (disabledDates.some((date) => current.isSame(date, "day")) &&
          !bookingDatesRange.some((date) => current.isSame(date, "day"))))
    );
  }

  const handleUpdate = () => {
    const [startDateString, endDateString] = dateRange;
    const startDate = new Date(`${startDateString} EDT`);
    const endDate = new Date(`${endDateString} EDT`);

    if (startDate.getTime() === endDate.getTime()) {
      return toast.error("Check-in and checkout date cannot be the same");
    }

    const rangeOfDates: string[] = getRangeOfDates(startDate, endDate);
    const isDateReserved = rangeOfDates.some(
      (date) =>
        disabledDates.includes(date) && !bookingDatesRange.includes(date)
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
          defaultValue={[dayjs(startDate), dayjs(endDate)]}
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
