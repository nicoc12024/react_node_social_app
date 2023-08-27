import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PostHeader from "./PostHeader";
import { MemoryRouter } from "react-router-dom";
import useFollow from "../../useHooksShared/useFollow";
import userEvent from "@testing-library/user-event";

const queryClient = new QueryClient();

jest.mock("../../useHooksShared/useFollow", () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe("<PostHeader />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockPost = {
    id: "1",
    userId: "23",
    name: "Sofi",
    profilePicture: "samplePic.jpg",
  };

  const mockCurrentUser = {
    id: "23",
  };

  const mockDeleteFunction = jest.fn();
  const mockSetEditModeFunction = jest.fn();
  const mockHandleFollow = jest.fn();
  const mockSetMenuOpen = jest.fn();

  const setup = (currentUser = mockCurrentUser, post = mockPost) => {
    useFollow.mockImplementation(() => ({
      handleFollow: mockHandleFollow,
      followedUserIds: [],
      setFollowedUserIds: jest.fn(),
      currentUserFollowing: [],
    }));

    return render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <PostHeader
            currentUser={currentUser}
            post={post}
            menuOpen={false}
            setMenuOpen={mockSetMenuOpen}
            handleDelete={mockDeleteFunction}
            setEditMode={mockSetEditModeFunction}
          />
        </MemoryRouter>
      </QueryClientProvider>
    );
  };

  test("toggles menu when three dots icon is clicked", async () => {
    setup();

    const threeDotsIcon = screen.getByTestId("three-dots-icon");
    expect(threeDotsIcon).toBeInTheDocument();

    // Before clicking, dropDownMenu shouldn't be visible and menuOpen should be false
    expect(screen.queryByTestId("dropDownMenu")).not.toBeInTheDocument();

    // Clicking should make dropDownMenu drop visible and menuOpen should be true
    userEvent.click(threeDotsIcon);

    // We are checking that the setMenuOpen function is called with the opposite of menuOpen
    const callbackFunction = mockSetMenuOpen.mock.calls[0][0];
    expect(callbackFunction(false)).toBe(true);
  });
});
