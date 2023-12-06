import { BookingCard } from "@/components/molecules/BookingCard";
import { useReservation } from "@/context/ReservationContext";

export function BookingListCards() {
  const { searchedPlaces } = useReservation();

  return (
    <div className="w-full flex flex-wrap my-3 max-w-screen-xl mx-auto">
      {searchedPlaces.length === 0 && (
        <p className="text-center w-full">No places found</p>
      )}
      {searchedPlaces.map((place) => (
        <BookingCard key={`booking-${place.id}`} {...place} />
      ))}
    </div>
  );
}
