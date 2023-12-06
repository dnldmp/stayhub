import { TripCard } from "@/components/molecules/TripCard";
import { useReservation } from "@/context/ReservationContext";
import moment from "moment";

export function TripListCard() {
  const { bookings } = useReservation();

  const formatDateRange = (startDate: Date, endDate: Date): string => {
    const startFormatted = moment(startDate).format("MMM D");
    const endFormatted = moment(endDate).format("D, YYYY");

    return `${startFormatted}–${endFormatted}`;
  };

  if (bookings.length === 0) {
    return (
      <div className="w-full flex flex-wrap my-3 max-w-screen-xl mx-auto">
        <p className="text-center w-full">No bookings found</p>
      </div>
    );
  }

  return (
    <div className="max-w-screen-xl mx-auto">
      <h2 className="ml-4 text-3xl my-10 font-medium">Trips</h2>
      <div className="w-full flex flex-wrap my-3 ">
        {bookings.map((place) => (
          <TripCard
            key={`trip-${place.id}`}
            bookingId={place.id!}
            homeId={place.homeId!}
            dateRange={formatDateRange(place.startDate, place.endDate)}
          />
        ))}
      </div>
    </div>
  );
}
