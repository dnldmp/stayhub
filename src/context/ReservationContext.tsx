import { createContext, useContext, useState } from "react";

interface ReservationContextProps {
  children: React.ReactNode;
}

interface ReservationContextData {
  createBooking: (data: Booking) => void;
  updateBooking: (id: number, data: Booking) => void;
  deleteBooking: (id: number) => void;
  bookings: Booking[];
}

export type Booking = {
  id: number;
  homeId: number;
  startDate: string;
  endDate: string;
};

const ReservationContext = createContext({} as ReservationContextData);

export const ResarvationContextProvider = ({
  children,
  ...rest
}: ReservationContextProps) => {
  const [bookings, setBookings] = useState<Booking[]>([]);

  const createBooking = (newBooking: Booking) => {
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

  return (
    <ReservationContext.Provider
      value={{
        createBooking,
        updateBooking,
        deleteBooking,
        bookings,
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
