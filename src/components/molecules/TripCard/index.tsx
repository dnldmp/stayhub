import { BookingCardImage } from "@/components/atoms/BookingCardImage";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { Button } from "@/components/atoms/Button";
import { useReservation } from "@/context/ReservationContext";
import { Modal } from "antd";
import { toast } from "react-toastify";
import { EditOutlined } from "@ant-design/icons";
import { EditReservationModal } from "../EditReservationModal";
import { useState } from "react";

const { confirm } = Modal;

interface TripCardProps {
  bookingId: number;
  homeId: number;
  dateRange: string;
}

export function TripCard({ homeId, dateRange, bookingId }: TripCardProps) {
  const { getPlaceById, deleteBooking } = useReservation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const place = getPlaceById(homeId);

  if (!place || !dateRange) return null;

  const showDeleteConfirm = () => {
    confirm({
      title: "Are you sure cancel this reservation?",
      icon: <ExclamationCircleFilled />,
      content: "After you cancel this reservation, you can't undo it.",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        deleteBooking(bookingId);
        toast.success("Reservation canceled successfully");
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  return (
    <>
      <div className="flex flex-row w-full md:w-1/2 xl:w-1/3 px-3 mb-7 flex-nowrap">
        <div className="w-24">
          <BookingCardImage imageLocation={place.image} />
        </div>
        <div className="ml-4 flex flex-col justify-between">
          <h4 className="font-medium">{place.title}</h4>
          <div className="flex flex-row">
            <p className="font-light text-sm text-gray-500">{dateRange}</p>
            <EditOutlined
              onClick={() => setIsModalOpen(true)}
              className="text-gray-400 cursor-pointer ml-4"
            />
          </div>
          <Button
            onClick={showDeleteConfirm}
            text="Cancel reservation"
            style={{
              padding: "0.5rem 1rem",
              fontSize: "0.85rem",
            }}
          />
        </div>
      </div>
      <EditReservationModal
        bookingId={bookingId}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        homeId={homeId}
      />
    </>
  );
}
