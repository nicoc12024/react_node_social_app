import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PostHeader from "./PostHeader";
import { MemoryRouter } from "react-router-dom";
import useFollow from "../../useHooksShared/useFollow";
import userEvent from "@testing-library/user-event";

const queryClient = new QueryClient();
let mockSetMenuOpen = jest.fn();

jest.mock("../../useHooksShared/useFollow", () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe("<PostHeader />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const setup = () => {
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
    mockSetMenuOpen = jest.fn();

    useFollow.mockImplementation(() => ({
      handleFollow: mockHandleFollow,
      followedUserIds: [],
      setFollowedUserIds: jest.fn(),
      currentUserFollowing: [],
    }));

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <PostHeader
            currentUser={mockCurrentUser}
            post={mockPost}
            menuOpen={false}
            setMenuOpen={mockSetMenuOpen}
            handleDelete={mockDeleteFunction}
            setEditMode={mockSetEditModeFunction}
          />
        </MemoryRouter>
      </QueryClientProvider>
    );
  };

  test("menu toggles when the three-dots icon is clicked", () => {
    setup();

    const threeDotsIcon = screen.getByTestId("three-dots-icon");
    expect(threeDotsIcon).toBeInTheDocument();

    expect(screen.queryByTestId("dropDownMenu")).not.toBeInTheDocument();

    userEvent.click(threeDotsIcon);
    const toggleMenuCallback = mockSetMenuOpen.mock.calls[0][0];
    expect(toggleMenuCallback(false)).toBe(true);
  });
});
