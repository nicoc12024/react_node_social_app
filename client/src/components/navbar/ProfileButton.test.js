import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import ProfileButton from "./ProfileButton";
import "@testing-library/jest-dom";

describe("ProfileButton", () => {
  test("renders ProfileButton without crashing", () => {
    render(<ProfileButton />);
  });

  test("displays tooltip when showProfileTooltip is true", () => {
    render(<ProfileButton showProfileTooltip={true} />);
    expect(screen.getByText("Profile")).toBeInTheDocument();
  });

  test("does not display tooltip when showProfileTooltip is false", () => {
    render(<ProfileButton showProfileTooltip={false} />);
    expect(screen.queryByText("Profile")).not.toBeInTheDocument();
  });

  test("calls onClick handler when icon is clicked", () => {
    const handleClick = jest.fn();
    render(<ProfileButton onClick={handleClick} />);
    fireEvent.click(screen.getByTestId("profile-icon"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test("calls onMouseEnter and onMouseLeave handlers", () => {
    const onMouseEnter = jest.fn();
    const onMouseLeave = jest.fn();
    render(<ProfileButton onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} />);
    fireEvent.mouseEnter(screen.getByTestId("profile-button-container"));
    expect(onMouseEnter).toHaveBeenCalledTimes(1);
    fireEvent.mouseLeave(screen.getByTestId("profile-button-container"));
    expect(onMouseEnter).toHaveBeenCalledTimes(1);
  });

  test("displays the profile image when desktop is true", () => {
    const currentUser = { id: "123", profilePicture: "pic.jpg", name: "Sofi" };
    render(<ProfileButton desktop={true} currentUser={currentUser} />);
    const imageElement = screen.getByAltText(currentUser.name);
    expect(imageElement).toBeInTheDocument();
  });

  test("displays the profile icon when desktop is false", () => {
    render(<ProfileButton desktop={false} />);
    const profileIcon = screen.getByTestId("profile-icon");
    expect(profileIcon).toBeInTheDocument();
  });
});
