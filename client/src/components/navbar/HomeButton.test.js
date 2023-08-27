import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import HomeButton from "./HomeButton";
import "@testing-library/jest-dom";

describe("HomeButton", () => {
  test("renders HomeButton without crashing", () => {
    render(<HomeButton />);
  });

  test("displays tooltip when showHomeTooltip is true", () => {
    render(<HomeButton showHomeTooltip={true} />);
    expect(screen.getByText("Home")).toBeInTheDocument();
  });

  test("does not display tooltip when showHomeTooltip is false", () => {
    render(<HomeButton showHomeTooltip={false} />);
    expect(screen.queryByText("Home")).not.toBeInTheDocument();
  });

  test("calls onClick handler when icon is clicked", () => {
    const handleClick = jest.fn();
    render(<HomeButton onClick={handleClick} />);
    fireEvent.click(screen.getByTestId("home-icon"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test("calls onMouseEnter and onMouseLeave handlers", () => {
    const handleMouseEnter = jest.fn();
    const handleMouseLeave = jest.fn();
    render(
      <HomeButton onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />
    );
    fireEvent.mouseEnter(screen.getByTestId("home-button-container"));
    expect(handleMouseEnter).toHaveBeenCalledTimes(1);
    fireEvent.mouseLeave(screen.getByTestId("home-button-container"));
    expect(handleMouseLeave).toHaveBeenCalledTimes(1);
  });
});
