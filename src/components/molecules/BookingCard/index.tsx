import { BookingCardImage } from "@/components/atoms/BookingCardImage";
import { useRouter } from "next/router";

interface BookingCardProps {
  id: number;
  title: string;
  distance: string;
  image: string;
}

export function BookingCard({ id, title, distance, image }: BookingCardProps) {
  const router = useRouter();

  return (
    <div
      data-testid="BookingCard"
      className="flex flex-col w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 cursor-pointer px-3 mb-5"
      onClick={() => router.push(`/booking/${id}`)}
    >
      <BookingCardImage imageLocation={image} />
      <div className="flex flex-row justify-between">
        <h4 className="font-medium text-sm">{title}</h4>
      </div>
      <p className="font-light text-sm text-gray-500">{distance}</p>
    </div>
  );
}
