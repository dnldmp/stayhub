import { placesList } from "@/mocks/placesList";
import moment from "moment";
import { createContext, useContext, useState } from "react";

interface ReservationContextProps {
  children: React.ReactNode;
}

interface ReservationContextData {
  createBooking: (data: Booking) => void;
  updateBooking: (id: number, data: Booking) => void;
  deleteBooking: (id: number) => void;
  bookings: Booking[];
  getPlaceById: (homeId: number) => Places | undefined;
  getReservedDatesByHomeId: (homeId: number) => string[];
}

export type Places = {
  id: number;
  title: string;
  distance: string;
  image: string;
};

export type Booking = {
  id?: number;
  homeId?: number;
  startDate: Date;
  endDate: Date;
};

const ReservationContext = createContext({} as ReservationContextData);

export const ResarvationContextProvider = ({
  children,
  ...rest
}: ReservationContextProps) => {
  const [bookings, setBookings] = useState<Booking[]>([]);

  const createBooking = (newBooking: Booking) => {
    newBooking.id = bookings.length + 1;
    setBookings([...bookings, newBooking]);
  };

  const updateBooking = (bookingId: number, newData: Booking) => {
    const updatedBookings = bookings.map((booking) =>
      booking.id === bookingId ? { ...booking, ...newData } : booking
    );
    setBookings(updatedBookings);
  };

  const deleteBooking = (bookingId: number) => {
    const filteredBookings = bookings.filter(
      (booking) => booking.id !== bookingId
    );
    setBookings(filteredBookings);
  };

  const getPlaceById = (homeId: number) => {
    return placesList.find((place) => place.id === Number(homeId));
  };

  const getReservedDatesByHomeId = (homeId: number): string[] => {
    const filteredBookings = bookings.filter(
      (booking) => booking.homeId === homeId
    );

    const reservedDates: string[] = [];

    filteredBookings.forEach((booking) => {
      const bookingStart = moment(booking.startDate);
      const bookingEnd = moment(booking.endDate);

      let currentDate = moment(bookingStart);
      const lastDate = moment(bookingEnd).add(1, "day"); // Incremento por um dia para incluir a data final

      while (currentDate.isBefore(lastDate, "day")) {
        reservedDates.push(currentDate.format("YYYY-MM-DD"));
        currentDate = currentDate.clone().add(1, "day");
      }
    });

    return reservedDates;
  };

  return (
    <ReservationContext.Provider
      value={{
        createBooking,
        updateBooking,
        deleteBooking,
        bookings,
        getPlaceById,
        getReservedDatesByHomeId,
      }}
      {...rest}
    >
      {children}
    </ReservationContext.Provider>
  );
};

export const useReservation = () => {
  const context = useContext(ReservationContext);
  if (context === undefined) {
    throw new Error(
      "useReservationContext must be used within a ReservationContextProvider"
    );
  }
  return context as ReservationContextData;
};
