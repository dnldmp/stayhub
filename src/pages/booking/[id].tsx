import { BookingCardImage } from "@/components/atoms/BookingCardImage";
import { Header } from "@/components/molecules/Header";
import { ReservationCard } from "@/components/molecules/ReservationCard";
import { Places, useReservation } from "@/context/ReservationContext";
import { placesList } from "@/mocks/placesList";
import { GetServerSideProps } from "next";

interface BookingProps {
  place: Places;
}

export default function Booking({ place }: BookingProps) {
  return (
    <div>
      <Header />
      <div className="flex flex-col max-w-screen-xl mx-auto p-4">
        <h2 className="font-medium text-2xl mb-4">{place.title}</h2>
        <div className="flex flex-col sm:flex-row">
          <div className="mr-6 w-full sm:w-1/2 mb-4">
            <BookingCardImage imageLocation={place.image} />
          </div>
          <ReservationCard homeId={place.id} />
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const id = params?.id || "";
  const numericId: number = Number(id);
  const place = placesList.find((place) => place.id === numericId);

  if (isNaN(numericId)) {
    return {
      notFound: true,
    };
  }

  if (!id || !place) {
    return {
      redirect: {
        destination: `/`,
        permanent: false,
      },
    };
  }

  return {
    props: {
      place,
    },
  };
};
