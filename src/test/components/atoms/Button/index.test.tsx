import React from "react";
import { render, screen } from "@testing-library/react";
import { Button } from "@/components/atoms/Button";

describe("Button component", () => {
  it("Should render properly", () => {
    render(<Button text="Testing the Button" />);
    expect(screen.getByTestId("Button")).toBeDefined();
  });

  it("Should render the text properly", () => {
    render(<Button text="Testing the Button" />);
    expect(screen.getByText("Testing the Button")).toBeDefined();
  });
});
