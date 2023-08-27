const PostContent = ({
  editMode,
  editedDescription,
  setEditedDescription,
  textAreaRef,
  post,
  handleEdit,
  showError,
  handleCancelEdit,
}) =>
  editMode ? (
    <div className="my-5 flex flex-col">
      <textarea
        value={editedDescription}
        onChange={(e) => setEditedDescription(e.target.value)}
        className="bg-gray-100 py-1 px-2 rounded-md w-full outline-none"
        ref={textAreaRef}
      />
      {post.image && (
        <img
          src={"/upload/" + post.image}
          alt=""
          className="w-[100%] max-h-[500px] object-cover mt-5"
        />
      )}
      {/* Edit Mode: Buttons for saving or canceling changes */}
      <div className="flex justify-end gap-2 mt-4 font-semibold">
        {showError && (
          <div className="text-red-500 my-auto text-sm font-normal">
            Please write something
          </div>
        )}
        <button
          onClick={handleCancelEdit}
          className="border-none py-[5px] px-[10px] text-black cursor-pointer bg-gray-100 rounded-[3px]"
        >
          Cancel
        </button>
        <button
          onClick={handleEdit}
          className="border-none py-[5px] px-[10px] text-white cursor-pointer bg-[#5271ff] rounded-[3px]"
        >
          Save
        </button>
      </div>
    </div>
  ) : (
    <div className="my-4">
      <p>{post.description}</p>
      {post.image && (
        <img
          src={"/upload/" + post.image}
          alt=""
          className="w-[100%] max-h-[500px] object-cover mt-5"
        />
      )}
    </div>
  );

export default PostContent;
