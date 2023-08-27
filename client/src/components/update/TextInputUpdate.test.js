import React from "react";
import { render, screen } from "@testing-library/react";
import TextInput from "./TextInput";
import userEvent from "@testing-library/user-event";

describe("TextInput", () => {
  const label = "Name";
  const value = "John Doe";
  const name = "name";
  const onChange = jest.fn();

  test("renders correctly with initial value", () => {
    render(<TextInput label={label} value={value} name={name} onChange={onChange} />);
    // Check if the label is rendered
    expect(screen.getByText(label)).toBeInTheDocument();
    // Get the input element by its name attribute
    const inputElement = screen.getByLabelText(label);
    // Check if the input has the correct value
    expect(inputElement.value).toBe(value);
    // Check if the input's value length is 25 or less
    expect(inputElement.value.length).toBeLessThanOrEqual(25);
  });

  test("responds to input changes and ensures value is 25 or less characters", () => {
    render(<TextInput label={label} value={value} name={name} onChange={onChange} />);
    const inputElement = screen.getByLabelText(label);
    // Simulate an input change
    const newValue = "Jake";
    userEvent.type(inputElement, newValue);
    // Check if the onChange handler is called
    expect(onChange).toHaveBeenCalled();
    // Check if the input's value length is 25 or less
    expect(inputElement.value.length).toBeLessThanOrEqual(25);
  });
});
