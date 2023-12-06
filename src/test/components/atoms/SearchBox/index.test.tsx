import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { SearchBox } from "@/components/atoms/SearchBox";

const mockFilterPlaces = jest.fn();
const mockReservationContextValue = {
  filterPlaces: mockFilterPlaces,
};

jest.mock("@/context/ReservationContext", () => ({
  useReservation: jest.fn(() => mockReservationContextValue),
}));

describe("SearchBox component", () => {
  it("Should render properly", () => {
    render(<SearchBox />);
    expect(screen.getByTestId("SearchBox")).toBeDefined();
  });

  it("Updates the search value correctly", () => {
    const { getByTestId } = render(<SearchBox />);
    const searchInput = getByTestId("SearchInput") as HTMLInputElement;

    fireEvent.change(searchInput, { target: { value: "London" } });
    expect(searchInput.value).toBe("London");
  });

  it("calls filterPlaces when search button is clicked", async () => {
    const { getByTestId } = render(<SearchBox />);
    const searchInput = getByTestId("SearchInput");
    const searchButton = getByTestId("SearchButton");

    fireEvent.change(searchInput, { target: { value: "Brazil" } });
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(mockFilterPlaces).toHaveBeenCalledWith("Brazil");
    });
  });

  it("calls filterPlaces with debounced value after input change", async () => {
    jest.useFakeTimers();
    const { getByPlaceholderText } = render(<SearchBox />);
    const searchInput = getByPlaceholderText("Search destinations");

    fireEvent.change(searchInput, { target: { value: "United States" } });

    jest.runAllTimers();

    await waitFor(() => {
      expect(mockFilterPlaces).toHaveBeenCalledWith("United States");
    });
  });
});
