import { BookingCard } from "@/components/molecules/BookingCard";
import { placesList } from "@/mocks/placesList";

export function BookingListCards() {
  return (
    <div className="w-full flex flex-wrap my-3 max-w-screen-xl mx-auto">
      {placesList.map((place) => (
        <BookingCard key={`booking-${place.id}`} {...place} />
      ))}
    </div>
  );
}
