import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import TextInput from "./TextInput";

describe("TextInput", () => {
  it("renders correctly with given props", () => {
    const name = "John";
    render(<TextInput value="" onChange={() => {}} name={name} />);
    const input = screen.getByPlaceholderText(`What's on your mind ${name}?`);
    expect(input).toBeInTheDocument();
  });

  it("calls onChange handler when value changes", () => {
    const onChange = jest.fn();
    render(<TextInput value="" onChange={onChange} name="John" />);
    const input = screen.getByPlaceholderText("What's on your mind John?");
    fireEvent.change(input, { target: { value: "New value" } });
    expect(onChange).toHaveBeenCalled();
  });

  it("displays the correct value", () => {
    const value = "Test value";
    render(<TextInput value={value} onChange={() => {}} name="John" />);
    const input = screen.getByDisplayValue(value);
    expect(input).toBeInTheDocument();
  });
});
