import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import moment from "moment";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useComments } from "./useComments";

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
      {/* Posting box for adding a new comment */}
      <div className="flex items-center justify-between gap-2 my-5">
        {/* User's profile picture */}
        <img
          src={`/upload/${currentUser.id}/${currentUser.profilePicture}`}
          alt=""
          className="w-[40px] h-[40px] rounded-full object-cover"
        />
        {/* Input field for typing a comment */}
        <input
          type="text"
          placeholder="Write a comment..."
          className="p-2 bg-transparent border bg-gray-100 rounded-md border-gray-200 w-[85%]  outline-none "
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {/* Send button to post the comment */}
        <button
          className="border-none bg-[#5271ff] text-white p-2 cursor-pointer rounded-[3px]"
          onClick={handleSharePost}
        >
          Send
        </button>
      </div>
      {/* Display existing comments */}
      {isLoading
        ? "Loading"
        : data.map((comment) => (
            <div className="flex items-center justify-start gap-3" key={comment.id}>
              {/* Commenter's profile picture */}
              <img
                src={`/upload/${comment.userId}/${currentUser.profilePicture}`}
                alt=""
                className="w-[40px] h-[40px] rounded-full object-cover"
              />
              {/* Individual comment box */}
              <div className="bg-gray-100 w-[85%] p-2 rounded-md">
                <div className="flex flex-col">
                  {/* User info including name and timestamp */}
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{comment.name}</span>{" "}
                    <span className="flex items-center text-gray-600 text-xs">
                      {moment(comment.createdAt).fromNow()}
                    </span>
                  </div>
                  {/* Comment text or editable textarea if in edit mode */}
                  {editingCommentId === comment.id ? (
                    <div className="w-full my-5 flex flex-col">
                      {/* Textarea for editing the comment */}
                      <textarea
                        value={editedDescription}
                        onChange={(e) => setEditedDescription(e.target.value)}
                        className="bg-gray-300 py-1 px-2 rounded-md outline-none"
                        ref={textAreaRef} // Attach the ref to the textarea
                      />
                      {/* Buttons to cancel or save the edited comment */}
                      <div className="flex justify-end gap-2 mt-4 font-semibold">
                        <button
                          onClick={() => setEditingCommentId(null)}
                          className="border-none py-[5px] px-[10px] text-black cursor-pointer bg-gray-100 rounded-[3px]"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleEditComment(comment)}
                          className="border-none py-[5px] px-[10px] text-white cursor-pointer bg-[#5271ff] rounded-[3px]"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-[#555]">{comment.description}</p>
                  )}
                </div>
              </div>
              {/* Three dots menu to delete or edit the comment */}
              <div className="relative">
                {comment.userId === currentUser.id && (
                  <MoreHorizIcon
                    onClick={() => toggleMenuOpen(comment.id)} // Toggle the menu for this comment
                    className="cursor-pointer"
                  />
                )}
                {/* Menu with delete and edit options */}
                {menuOpen[comment.id] && comment.userId === currentUser.id && (
                  <div
                    ref={menuRef} // Attach the ref to the dropdown menu
                    className="absolute rounded-md right-0 shadow-[rgba(0,0,0,0.35)_0px_5px_12px] font-semibold bg-white z-10 text-black text-sm p-2"
                  >
                    {/* Delete button */}
                    <button
                      onClick={() => handleDeleteComment(comment.id)}
                      className="py-1 px-4 rounded-sm hover:bg-gray-100"
                    >
                      Delete
                    </button>
                    <hr className="my-[4px]" />
                    {/* Edit button */}
                    <button
                      onClick={() => {
                        setEditingCommentId(comment.id);
                        setEditedDescription(comment.description);
                        toggleMenuOpen(comment.id); // Close the menu for this comment
                      }}
                      className="py-1 px-4 rounded-sm hover:bg-gray-100 w-full text-left"
                    >
                      Edit
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
    </div>
  );
};

export default Comments;
