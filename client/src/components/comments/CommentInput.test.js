import { render, screen } from "@testing-library/react";
import CommentInput from "./CommentInput";
import userEvent from "@testing-library/user-event"; // Corrected this line

describe("<CommentInput />", () => {
  const mockSetDescription = jest.fn();
  const mockHandleSharePost = jest.fn();
  const mockUser = {
    id: "23",
    name: "Sofi",
    profilePicture: "samplePic.jpg",
  };

  const setup = () => {
    return render(
      <CommentInput
        description="Test description"
        setDescription={mockSetDescription}
        handleSharePost={mockHandleSharePost}
        currentUser={mockUser}
      />
    );
  };

  test("renders correctly", () => {
    setup();
    const inputElement = screen.getByPlaceholderText("Write a comment...");
    expect(inputElement).toBeInTheDocument();
  });

  test("updates input value on change", () => {
    setup();
    const inputElement = screen.getByPlaceholderText("Write a comment...");
    userEvent.type(inputElement, "New description");
    expect(mockSetDescription).toHaveBeenCalledTimes(15);
  });

  test("constructs the image URL correctly", () => {
    setup();
    const imgElem = screen.getByAltText(mockUser.name);
    expect(imgElem.src).toBe("http://localhost/upload/23/samplePic.jpg");
  });

  test("handle share post called once after click", () => {
    setup();
    const sendButton = screen.getByText("Send");
    userEvent.click(sendButton);
    expect(mockHandleSharePost).toHaveBeenCalledTimes(1);
  });
});
