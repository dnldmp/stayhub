import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { useRouter } from "next/router";
import { BookingCard } from "@/components/molecules/BookingCard";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("BookingCard component", () => {
  const mockRouterPush = jest.fn();
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockRouterPush,
    });
  });

  const mockProps = {
    id: 1,
    title: "United States",
    distance: "5 miles",
    image: "/homes/01.jpg",
  };

  it("renders BookingCard correctly with provided props", () => {
    const { getByTestId, getByText } = render(<BookingCard {...mockProps} />);

    const bookingCard = getByTestId("BookingCard");
    expect(bookingCard).toBeDefined();

    const titleElement = getByText(mockProps.title);
    expect(titleElement).toBeDefined();

    const distanceElement = getByText(mockProps.distance);
    expect(distanceElement).toBeDefined();
  });

  it("navigates to the correct route on click", () => {
    const { getByTestId } = render(<BookingCard {...mockProps} />);

    const bookingCard = getByTestId("BookingCard");
    fireEvent.click(bookingCard);

    expect(mockRouterPush).toHaveBeenCalledWith(`/booking/${mockProps.id}`);
  });
});
