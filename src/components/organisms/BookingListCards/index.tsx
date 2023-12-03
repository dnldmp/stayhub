import { BookingCard } from "@/components/molecules/BookingCard";
import { bookingList } from "@/mocks/bookingList";

export function BookingListCards() {
  return (
    <div className="w-full flex flex-wrap my-3 max-w-screen-xl mx-auto">
      {bookingList.map((book) => (
        <BookingCard key={`booking-${book.id}`} {...book} />
      ))}
    </div>
  );
}
