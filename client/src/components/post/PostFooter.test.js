import { render, screen } from "@testing-library/react";
import PostFooter from "./PostFooter";
import userEvent from "@testing-library/user-event";

describe("<PostFooter />", () => {
  const handleLikeMock = jest.fn();
  const currentUser = {
    id: "1",
    name: "Sofi",
  };

  const setup = ({
    isLoading = false,
    data = [],
    currentUser = {},
    handleLike = handleLikeMock,
  }) => {
    render(
      <PostFooter
        isLoading={isLoading}
        data={data}
        currentUser={currentUser}
        handleLike={handleLike}
      />
    );
  };

  test("renders correctly", () => {
    setup({ isLoading: false, data: [currentUser.id], currentUser });
    const commentsElement = screen.getByText("0 Comments");
    const likesElement = screen.getByText("1 Likes");
    const shareButton = screen.getByText("Share");
    expect(commentsElement).toBeInTheDocument();
    expect(likesElement).toBeInTheDocument();
    expect(shareButton).toBeInTheDocument();
  });

  test("liked button is rendered when user has liked the post", () => {
    setup({ isLoading: false, data: [currentUser.id], currentUser });
    const favoriteOutlinedIcon = screen.getByTestId("liked-icon-red");
    expect(favoriteOutlinedIcon).toBeInTheDocument();
  });

  test("unliked button is rendered when user has not liked the post", () => {
    setup({ isLoading: false, data: [], currentUser });
    const favoriteBorderOutlinedIcon = screen.getByTestId("like-icon");
    expect(favoriteBorderOutlinedIcon).toBeInTheDocument();
  });

  test("onClick like-icon should call a function", () => {
    const initialData = [];
    let mockData = initialData;
    handleLikeMock.mockImplementation(() => {
      mockData = [currentUser.id];
    });

    setup({
      isLoading: false,
      data: initialData,
      currentUser,
      handleLike: handleLikeMock,
    });
    const favoriteBorderOutlinedIcon = screen.getByTestId("like-icon");
    userEvent.click(favoriteBorderOutlinedIcon);
    expect(handleLikeMock).toHaveBeenCalled();
    expect(mockData).toEqual([currentUser.id]);
  });

  test("onClick liked-icon-red should call a function", () => {
    const initialData = [currentUser.id];
    let mockData = initialData;
    handleLikeMock.mockImplementation(() => {
      mockData = [];
    });
    setup({
      isLoading: false,
      data: initialData,
      currentUser,
    });
    const favoriteOutlinedIcon = screen.getByTestId("liked-icon-red");
    userEvent.click(favoriteOutlinedIcon);
    expect(handleLikeMock).toHaveBeenCalled();
    expect(mockData).toEqual([]);
  });
});
