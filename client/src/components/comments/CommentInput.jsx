import React from "react";

const CommentInput = ({ description, setDescription, handleSharePost, currentUser }) => {
  return (
    <div className="flex items-center justify-between gap-2 my-5">
      <img
        src={`/upload/${currentUser.id}/${currentUser.profilePicture}`}
        alt={currentUser.name}
        className="w-[40px] h-[40px] rounded-full object-cover"
      />
      <input
        type="text"
        placeholder="Write a comment..."
        className="p-2 bg-transparent border bg-gray-100 rounded-md border-gray-200 w-[85%]  outline-none "
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button
        className="border-none bg-[#5271ff] text-white p-2 cursor-pointer rounded-[3px]"
        onClick={handleSharePost}
      >
        Send
      </button>
    </div>
  );
};

export default CommentInput;
