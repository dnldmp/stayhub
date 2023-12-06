import React from "react";
import { render, screen } from "@testing-library/react";
import { BookingCardImage } from "@/components/atoms/BookingCardImage";

describe("BookingCardImage component", () => {
  it("Should render properly", () => {
    const imageLocation = "/homes/01.jpg";
    render(<BookingCardImage imageLocation={imageLocation} />);
    expect(screen.getByAltText("home-image")).toBeDefined();
  });
});
