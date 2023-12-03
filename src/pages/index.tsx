import { Header } from "@/components/molecules/Header";
import { BookingCard } from "@/components/molecules/BookingCard";
import { Booking, useReservation } from "@/context/ReservationContext";
import { BookingListCards } from "@/components/organisms/BookingListCards";
import { DatePicker } from "antd";

export default function Home() {
  const { createBooking, bookings, updateBooking, deleteBooking } =
    useReservation();

  const handleOnClick = () => {
    createBooking({
      id: 1,
      homeId: 1,
      startDate: "2021-10-10",
      endDate: "2021-10-20",
    });
  };

  const handleUpdate = () => {
    updateBooking(1, {
      id: 1,
      homeId: 2,
      startDate: "2021-10-10",
      endDate: "2021-10-20",
    });
  };

  return (
    <main>
      <Header />
      <BookingListCards />
    </main>
  );
}
