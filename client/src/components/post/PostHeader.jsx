import { Link } from "react-router-dom";
import moment from "moment";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import useFollow from "../../useHooksShared/useFollow";

const PostHeader = ({
  post,
  currentUser,
  setMenuOpen,
  menuOpen,
  menuRef,
  handlePostDelete,
  setEditMode,
}) => {
  const { handleFollow } = useFollow();

  return (
    <div className="flex items-center justify-between">
      <div className="flex gap-3">
        <img
          src={`/upload/${post.userId}/${post.profilePicture}`}
          alt={post.name}
          className="w-[40px] h-[40px] rounded-full object-cover"
        />
        <div className="flex flex-col">
          <Link
            to={`/profile/${post.userId}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <span className="font-semibold">{post.name}</span>
          </Link>
          <span className="text-xs">{moment(post.createdAt).fromNow()}</span>
        </div>
      </div>
      <div className="relative">
        <MoreHorizIcon
          onClick={() => setMenuOpen((prevMenuOpen) => !prevMenuOpen)}
          className="cursor-pointer"
          data-testid="three-dots-icon"
        />
        {menuOpen && (
          <div
            role="menu"
            data-testid="dropDownMenu"
            ref={menuRef}
            className="absolute rounded-md right-0 bg-white shadow-[rgba(0,0,0,0.35)_0px_5px_12px] font-semibold text-black text-sm p-2"
          >
            {post.userId === currentUser.id ? (
              <>
                <button
                  onClick={handlePostDelete}
                  className="py-1 px-4 rounded-sm hover:bg-gray-100"
                  data-testid="delete-post-button"
                >
                  Delete
                </button>
                <hr className="my-[4px]" />
                <button
                  onClick={() => {
                    setEditMode(true);
                    setMenuOpen(false);
                  }}
                  className="py-1 px-4 rounded-sm hover:bg-gray-100 w-full text-left"
                >
                  Edit
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  setMenuOpen(false);
                  handleFollow(post.userId);
                }}
                className="py-1 px-4 rounded-sm hover:bg-gray-100 w-full text-left"
                data-testid="unfollow-button"
              >
                Unfollow
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PostHeader;
