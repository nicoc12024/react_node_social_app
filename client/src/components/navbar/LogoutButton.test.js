import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import LogoutButton from "./LogoutButton";
import "@testing-library/jest-dom";

describe("LogoutButton", () => {
  test("renders LogoutButton without crashing", () => {
    render(<LogoutButton />);
  });

  test("displays tooltip when showLogoutTooltip is true", () => {
    render(<LogoutButton showLogoutTooltip={true} />);
    expect(screen.getByText("Logout")).toBeInTheDocument();
  });

  test("does not display tooltip when showLogoutTooltip is false", () => {
    render(<LogoutButton showLogoutTooltip={false} />);
    expect(screen.queryByText("Logout")).not.toBeInTheDocument();
  });

  test("calls onClick handler when icon is clicked", () => {
    const handleClick = jest.fn();
    render(<LogoutButton onClick={handleClick} />);
    fireEvent.click(screen.getByTestId("logout-icon"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test("calls onMouseEnter and onMouseLeave handlers", () => {
    const onMouseEnter = jest.fn();
    const onMouseLeave = jest.fn();
    render(<LogoutButton onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} />);
    fireEvent.mouseEnter(screen.getByTestId("logout-button-container"));
    expect(onMouseEnter).toHaveBeenCalledTimes(1);
    fireEvent.mouseLeave(screen.getByTestId("logout-button-container"));
    expect(onMouseEnter).toHaveBeenCalledTimes(1);
  });
});
