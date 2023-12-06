import React from "react";
import { render } from "@testing-library/react";
import { useReservation } from "@/context/ReservationContext";
import { BookingListCards } from "@/components/organisms/BookingListCards";

jest.mock("@/context/ReservationContext", () => ({
  useReservation: jest.fn(),
}));

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("BookingListCards component", () => {
  it('renders "No places found" when searchedPlaces is empty', () => {
    (useReservation as jest.Mock).mockReturnValue({
      searchedPlaces: [],
    });

    const { getByText } = render(<BookingListCards />);
    const noPlacesFoundText = getByText("No places found");

    expect(noPlacesFoundText).toBeDefined();
  });

  it("renders BookingCard for each place in searchedPlaces", () => {
    const mockPlaces = [
      { id: 1, title: "Paris", distance: "5 miles", image: "/homes/01.jpg" },
      {
        id: 2,
        title: "Berlin",
        distance: "10 miles",
        image: "/homes/02.jpg",
      },
    ];

    (useReservation as jest.Mock).mockReturnValue({
      searchedPlaces: mockPlaces,
    });

    const { getAllByTestId } = render(<BookingListCards />);
    console.log(getAllByTestId);
    const bookingCards = getAllByTestId("BookingCard");

    expect(bookingCards.length).toBe(mockPlaces.length);
  });
});
