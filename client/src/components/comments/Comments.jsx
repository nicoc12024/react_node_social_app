import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { useComments } from "./useComments";
import CommentInput from "./CommentInput";
import SingleComment from "./SingleComment";

/**
 * Comments Component
 *
 * This component handles the display and interaction of comments for a given post.
 * It includes functionality for adding new comments, editing existing comments,
 * and deleting comments.
 *
 * Props:
 * - postId: The ID of the post for which the comments are to be displayed.
 *
 * Features:
 * - Displays a text box for users to write and submit new comments.
 * - Lists existing comments along with the commenter's name, profile picture,
 *   and timestamp.
 * - Provides edit and delete options for the comments owned by the logged-in user.
 * - Utilizes the useComments custom hook to handle comment-related operations.
 *
 * Dependencies:
 * - AuthContext for current user information.
 * - useComments for handling comment-related logic.
 * - MoreHorizIcon from @mui/icons-material for displaying the menu icon.
 * - moment for formatting comment timestamps.
 */

const Comments = ({ postId }) => {
  const { currentUser } = useContext(AuthContext);

  const {
    description,
    setDescription,
    editingCommentId,
    setEditingCommentId,
    editedDescription,
    setEditedDescription,
    menuOpen,
    toggleMenuOpen,
    textAreaRef,
    menuRef,
    isLoading,
    data,
    handleSharePost,
    handleEditComment,
    handleDeleteComment,
  } = useComments(postId);

  return (
    <div className="flex flex-col justify-between gap-2">
      <CommentInput
        description={description}
        setDescription={setDescription}
        handleSharePost={handleSharePost}
        currentUser={currentUser}
      />

      {/* Display existing comments */}
      {isLoading
        ? "Loading"
        : data.map((comment) => (
            <SingleComment
              key={comment.id}
              comment={comment}
              editingCommentId={editingCommentId}
              setEditingCommentId={setEditingCommentId}
              editedDescription={editedDescription}
              setEditedDescription={setEditedDescription}
              handleEditComment={handleEditComment}
              handleDeleteComment={handleDeleteComment}
              toggleMenuOpen={toggleMenuOpen}
              menuOpen={menuOpen}
              currentUser={currentUser}
              textAreaRef={textAreaRef}
              menuRef={menuRef}
            />
          ))}
    </div>
  );
};

export default Comments;
