import { render, screen } from "@testing-library/react";
import SingleComment from "./SingleComment";

describe("<SingleComment />", () => {
  const mockComment = {
    id: "1",
    userId: "23",
    name: "Sofi",
    createdAt: "",
    description: "description text",
  };
  const mockCurrentUser = {
    id: "23",
    name: "Sofi",
    profilePicture: "samplePic.jpg",
  };
  const mockMenuOpen = {
    1: false, // Initial state for the mock comment with id '1'
  };

  const setup = () => {
    return render(
      <SingleComment
        currentUser={mockCurrentUser}
        comment={mockComment}
        menuOpen={mockMenuOpen}
      />
    );
  };

  test("renders correctly", () => {
    setup();

    // Check if the comment description is displayed
    const descriptionElement = screen.getByText(mockComment.description);
    expect(descriptionElement).toBeInTheDocument();

    // Check if the commenter's name is displayed
    const nameElement = screen.getByText(mockComment.name);
    expect(nameElement).toBeInTheDocument();

    // Check if the profile picture is rendered with the correct src
    const imgElem = screen.getByAltText(mockCurrentUser.name);
    expect(imgElem.src).toBe("http://localhost/upload/23/samplePic.jpg");

    // Check if the three dots menu is present
    const threeDotsIcon = screen.getByTestId("three-dots-icon");
    expect(threeDotsIcon).toBeInTheDocument();
  });
});
