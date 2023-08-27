import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import moment from "moment";

const SingleComment = ({
  comment,
  editingCommentId,
  setEditingCommentId,
  editedDescription,
  setEditedDescription,
  handleEditComment,
  handleDeleteComment,
  toggleMenuOpen,
  menuOpen,
  currentUser,
  textAreaRef,
  menuRef,
}) => {
  return (
    <>
      <div className="flex items-center justify-start gap-3" key={comment.id}>
        {/* Commenter's profile picture */}
        <img
          src={`/upload/${comment.userId}/${currentUser.profilePicture}`}
          alt={currentUser.name}
          className="w-[40px] h-[40px] rounded-full object-cover"
        />
        {/* Individual comment box */}
        <div className="bg-gray-100 w-[85%] p-2 rounded-md">
          <div className="flex flex-col">
            {/* User info including name and timestamp */}
            <div className="flex items-center gap-2">
              <span className="font-semibold">{comment.name}</span>
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
              data-testid="three-dots-icon"
            />
          )}
          {/* Menu with delete and edit options */}
          {menuOpen[comment.id] && comment.userId === currentUser.id && (
            <div
              ref={menuRef}
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
    </>
  );
};

export default SingleComment;
