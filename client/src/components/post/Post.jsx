import { useContext } from "react";
import Comments from "../comments/Comments";
import { AuthContext } from "../../context/authContext";
import { usePostLogic } from "./usePostLogic";
import PostHeader from "./PostHeader";
import PostContent from "./PostContent";
import PostFooter from "./PostFooter";

/**
 * Post Component
 *
 * This component handles the rendering of an individual post that comes from Posts component, including the header,
 * content, and footer sections. It also includes the comments section and options
 * for editing and deleting the post.
 *
 * Props:
 * - post: The post object containing all relevant information.
 *
 * Features:
 * - Displays the user's profile picture, name, and timestamp.
 * - Shows post description, image, and options for like, comment, and share.
 * - Provides edit and delete options for the post owned by the logged-in user.
 * - Renders the comments section if the comments are open.
 * - Utilizes the usePostLogic custom hook to handle post-related operations.
 *
 * Dependencies:
 * - AuthContext for current user information.
 * - usePostLogic for handling post-related logic.
 * - PostHeader, PostContent, PostFooter for organizing the post structure.
 * - Comments for displaying comments related to the post.
 * - Various icons from @mui/icons-material for UI elements.
 */

// Post component definition
const Post = ({ post }) => {
  const { currentUser } = useContext(AuthContext);

  const {
    setMenuOpen,
    menuOpen,
    menuRef,
    handleDelete,
    setEditMode,
    editMode,
    editedDescription,
    setEditedDescription,
    textAreaRef,
    isLoading,
    data,
    handleEdit,
    handleLike,
    setCommentOpen,
    commentOpen,
  } = usePostLogic({ currentUser, post });

  return (
    <div className="shadow-md rounded-[20px] bg-white">
      {!isLoading && (
        <div className="p-5">
          <PostHeader
            post={post}
            currentUser={currentUser}
            setMenuOpen={setMenuOpen}
            menuOpen={menuOpen}
            menuRef={menuRef}
            handleDelete={handleDelete}
            setEditMode={setEditMode}
          />
          <PostContent
            editMode={editMode}
            editedDescription={editedDescription}
            setEditedDescription={setEditedDescription}
            textAreaRef={textAreaRef}
            post={post}
            handleEdit={handleEdit}
            setEditMode={setEditMode}
          />
          <PostFooter
            isLoading={isLoading}
            data={data}
            currentUser={currentUser}
            handleLike={handleLike}
            post={post}
            setCommentOpen={setCommentOpen}
            commentOpen={commentOpen}
            Comments={Comments}
          />
          {/* Comments Section */}
          {commentOpen && <Comments postId={post.id} />}
        </div>
      )}
    </div>
  );
};

export default Post;
