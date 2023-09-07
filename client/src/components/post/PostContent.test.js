import { render, screen } from "@testing-library/react";
import PostContent from "./PostContent";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MemoryRouter } from "react-router-dom";
const queryClient = new QueryClient();
jest.mock("../../useHooksShared/useFollow", () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe("<PostContent />", () => {
  const setup = ({
    editMode = false,
    showError = false,
    post = {
      id: 1,
      description: "This is a post",
      image: "samplePic.jpg",
    },
    setEditedDescription = jest.fn(),
  }) => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <PostContent
            editMode={editMode}
            setEditedDescription={setEditedDescription}
            showError={showError}
            post={post}
          />
        </MemoryRouter>
      </QueryClientProvider>
    );
  };

  test("should display the post description without image when not in edit mode", () => {
    setup({
      post: {
        id: 1,
        description: "This is a post",
        image: null,
      },
    });
    const postDescription = screen.getByText("This is a post");
    const imageElement = screen.queryByRole("img");
    expect(postDescription).toBeInTheDocument();
    expect(imageElement).not.toBeInTheDocument();
  });

  test("should display the post description and image when not in edit mode", () => {
    setup({});
    const postDescription = screen.getByText("This is a post");
    const imageElement = screen.getByRole("img");
    expect(postDescription).toBeInTheDocument();
    expect(imageElement).toBeInTheDocument();
  });

  test("should display 'Save' and 'Cancel' buttons and textarea when in edit mode with no error message", () => {
    setup({
      editMode: true,
    });
    const textarea = screen.getByRole("textbox");
    const cancelButton = screen.getByText("Cancel");
    const saveButton = screen.getByText("Save");
    expect(cancelButton).toBeInTheDocument();
    expect(saveButton).toBeInTheDocument();
    expect(textarea).toBeInTheDocument();
  });

  test("should display error message alongside 'Save' and 'Cancel' buttons when in edit mode with an error", () => {
    setup({
      editMode: true,
      showError: true,
    });
    const pElementError = screen.getByText("Please write something");
    const cancelButton = screen.getByText("Cancel");
    const saveButton = screen.getByText("Save");
    expect(cancelButton).toBeInTheDocument();
    expect(saveButton).toBeInTheDocument();
    expect(pElementError).toBeInTheDocument();
  });

  test("should update textarea value on user input when in edit mode", () => {
    setup({ editMode: true });
    const textarea = screen.getByRole("textbox");
    userEvent.type(textarea, "New description");
    expect(textarea).toHaveValue("New description");
  });
});
