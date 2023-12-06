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
  searchedPlaces: Places[];
  filterPlaces: (search: string) => void;
  getRangeOfDates: (startDate: Date, endDate: Date) => string[];
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
  const [searchedPlaces, setSearchedPlaces] = useState<Places[]>(placesList);

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

  const getDatesInRange = (startDate: Date, endDate: Date): string[] => {
    const dates: string[] = [];

    let currentDate = moment(startDate);
    const lastDate = moment(endDate).add(1, "day");

    while (currentDate.isBefore(lastDate, "day")) {
      dates.push(currentDate.format("YYYY-MM-DD"));
      currentDate = currentDate.clone().add(1, "day");
    }

    return dates;
  };

  const getRangeOfDates = (startDate: Date, endDate: Date): string[] => {
    const rangeOfDates: string[] = getDatesInRange(startDate, endDate);
    return rangeOfDates;
  };

  const getReservedDatesByHomeId = (homeId: number): string[] => {
    const filteredBookings = bookings.filter(
      (booking) => booking.homeId === homeId
    );
    const reservedDates: string[] = [];

    filteredBookings.forEach((booking) => {
      const datesInRange = getDatesInRange(booking.startDate, booking.endDate);
      reservedDates.push(...datesInRange);
    });

    return reservedDates;
  };

  const filterPlaces = (search: string) => {
    if (!search) return setSearchedPlaces(placesList);

    const filteredPlaces = placesList.filter(
      (place) =>
        place.title.toLowerCase().includes(search.toLowerCase()) ||
        place.distance.toLowerCase().includes(search.toLowerCase())
    );
    setSearchedPlaces(filteredPlaces);
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
        filterPlaces,
        searchedPlaces,
        getRangeOfDates,
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
